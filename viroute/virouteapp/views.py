from django.shortcuts import render
from django.middleware.csrf import get_token
from django.http import HttpResponse, JsonResponse
import requests
from django.conf import settings
from django.contrib.auth import get_user_model
import json
from .models import User, Ticket, Image
from .serializers import UserLoginSerializer, UserSerializer, UpdateAvatarSerializer, BusRouteSerializer, FavPlaceSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
import os
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
import yagmail
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import logging
from django.utils.timezone import now
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from django.template.loader import render_to_string
from django.shortcuts import render, redirect
from django.contrib.auth.forms import PasswordResetForm
# Ticket list
from .models import Ticket, BusRoute, FavPlace



logger = logging.getLogger(__name__)


# Get route/map API
def get_route(request):
    start = request.GET.get('start')
    end = request.GET.get('end')
    url = f"https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62481c184721ac24419cbc62a1f87c43d9dc&start={start}&end={end}"
    response = requests.get(url)

    if response.status_code == 200:
        return JsonResponse(response.json())  # Return JSON data
    else:
        return JsonResponse({'error': response.status_code})


# Login
class UserLoginView(APIView):
    def post(self, request):
        try:
            if request.content_type == 'application/json':
                data = request.data  
            else:
                raw_body = request.POST.get('_content')
                if raw_body:
                    data = json.loads(raw_body)  
                else:
                    return Response(
                        {"error": "Invalid content-type or missing data."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            print("Parsed data:", data)  # Log parsed data for debugging

            # Validate the data using the UserLoginSerializer
            serializer = UserLoginSerializer(data=data)

            if serializer.is_valid():
                # If data is valid, retrieve the user from validated data
                user = serializer.validated_data['user']
                
                # Return a successful response with user details
                return Response({
                    "message": "Login successful",
                    "user": {
                        "userID": user.userID,
                        "fullName": user.fullName,
                        "phoneNumber": str(user.phoneNumber),
                        "userEmail": user.userEmail,
                        "balance": str(user.balance)  # Ensure balance is returned as a string
                    }
                }, status=status.HTTP_200_OK)

            # If the serializer is not valid, return the errors
            return Response({
                "message": "Login failed",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Catch any unexpected errors and return them in the response
            return Response(
                {"error": "An error occurred", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


# Sign up
@api_view(['POST'])
def signup(request):
    try:
        if request.content_type == 'application/json':
            data = request.data
        else:
            raw_body = request.POST.get('_content')
            if raw_body:
                data = json.loads(raw_body)
            else:
                return Response(
                    {"error": "Invalid content-type or missing data."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        print("Parsed data:", data)

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "User created successfully",
                "user": {
                    "userID": user.userID,
                    "fullName": user.fullName,
                    "phoneNumber": str(user.phoneNumber),
                    "userEmail": user.userEmail,
                    "balance": str(user.balance)
                }
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response(
            {"error": "An error occurred", "details": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )


# Ticket list
def ticket_list(request):
    tickets = Ticket.objects.all()
    return render(request, 'ticket_list.html', {'tickets': tickets})


# Get image by name
def get_image_by_name(request, image_name):
    image = get_object_or_404(Image, image_name=image_name)

    if not image.image_path:
        return HttpResponse("Image does not exist", status=404)

    image_path = os.path.join(settings.MEDIA_ROOT, 'images', image.image_path.name)

    with open(image_path, 'rb') as img:
        return HttpResponse(img.read(), content_type="image/png")


# Update user information
@api_view(['PUT'])
def update_user_info(request, user_id):
    try:
        if request.content_type == 'application/json':
            data = request.data
        else:
            raw_body = request.POST.get('_content')
            if raw_body:
                data = json.loads(raw_body)
            else:
                return Response(
                    {"error": "Invalid content-type or missing data."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        print("Parsed data:", data)  
        try:
            user = User.objects.get(userID=user_id)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            # Save the updated user
            serializer.save()
            
            # Fetch the updated user to return the latest data
            updated_user = User.objects.get(userID=user_id)
            updated_serializer = UserSerializer(updated_user)

            return Response({
                "message": "User updated successfully",
                "user": updated_serializer.data  # Return updated user data
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid data", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response(
            {"error": "An unexpected error occurred", "details": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
def get_bus_routes(request):
    bus_routes = BusRoute.objects.all()
    serializer = BusRouteSerializer(bus_routes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def get_bus_routes_by_start_and_end(request):
    try:
        if request.content_type == 'application/json':
            data = request.data
        else:
            raw_body = request.POST.get('_content')
            if raw_body:
                data = json.loads(raw_body)
            else:
                return Response(
                    {"error": "Invalid content-type or missing data."},
                    status=status.HTTP_400_BAD_REQUEST
                )

        bus_start = data.get('bus_start', None)
        bus_end = data.get('bus_end', None)
        
        if not bus_start or not bus_end:
            return Response(
                {"error": "Both 'bus_start' and 'bus_end' are required fields."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        bus_routes = BusRoute.objects.filter(
            bus_start__icontains=bus_start, 
            bus_end__icontains=bus_end
        )
        
        bus_names = bus_routes.values_list('bus_Name', flat=True)
        
        if not bus_names:
            return Response(
                {"message": "No bus routes found for the given start and end points."}, 
                status=status.HTTP_404_NOT_FOUND
            )
        
        return Response({"bus_names": list(bus_names)}, status=status.HTTP_200_OK)
    
    except Exception as e:
        # Xử lý lỗi chung
        return Response(
            {"error": "An error occurred", "details": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
def create_fav_place(request):
    try:
        if request.content_type == 'application/json':
            data = request.data
        else:
            raw_body = request.POST.get('_content')
            if raw_body:
                data = json.loads(raw_body)
            else:
                return Response(
                    {"error": "Invalid content-type or missing data."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        data['user'] = request.user.id
        serializer = FavPlaceSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Favorite place created successfully",
                "fav_bus": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response(
            {"error": "An error occurred", "details": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
        

@api_view(['GET'])
def get_fav_place(request, user_id):
    try:
        if request.content_type == 'application/json':
            data = request.data
        else:
            raw_body = request.POST.get('_content')
            if raw_body:
                data = json.loads(raw_body)
            else:
                return Response(
                    {"error": "Invalid content-type or missing data."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        fav_buses = FavPlace.objects.filter(user__userID=user_id)
        
        if not fav_buses:
            return Response({"message": "No favorite buses found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = FavPlaceSerializer(fav_buses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response(
            {"error": "An error occurred", "details": str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )

class UpdateAvatarView(APIView):
    def put(self, request, *args, **kwargs):
        # Lấy user từ `userID` được truyền trong request
        user_id = request.data.get('userID')
        if not user_id:
            return Response({'error': 'userID is required'}, status=400)
        
        try:
            user = User.objects.get(userID=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)
        
        # Xử lý serializer
        serializer = UpdateAvatarSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Avatar updated successfully!', 'avatar_url': user.avatar.url})
        
        return Response(serializer.errors, status=400)

class GetAvatarUrlView(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user  
        if user.avatar:
            avatar_url = f"https://test-production-1774.up.railway.app/media/{user.avatar}"
            return Response({'avatar_url': avatar_url})
        
        return Response({'error': 'No avatar found'}, status=404)

'''
# User feedback
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']
SERVICE_ACCOUNT_FILE = 'credentials.json'  # Update path to credentials JSON file

credentials = Credentials.from_service_account_file(
    SERVICE_ACCOUNT_FILE, scopes=SCOPES)
gc = gspread.authorize(credentials)
spreadsheet_id = '14MucS7dhQa-SFTRnub1Vzr_PtDY7zU4JVDuM5_51bqQ'  # Update Google Sheets ID
sheet = gc.open_by_key(spreadsheet_id).sheet1

@api_view(['POST'])
def submit_feedback(request):
    serializer = FeedbackSerializer(data=request.data)
    if serializer.is_valid():
        feedback = serializer.save()
        # Log feedback to Google Sheets
        sheet.append_row([feedback.user.username, feedback.feedback, feedback.created_at.strftime('%Y-%m-%d %H:%M:%S')])
        return Response({"message": "Feedback submitted successfully"}, status=status.HTTP_201_CREATED)
    else:
        return Response({"error": "Invalid data", "details": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)'''