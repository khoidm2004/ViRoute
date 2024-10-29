from django.shortcuts import render

from django.http import HttpResponse
# Testing FROM this part - whoever delete this shit is a cunt, unable to be a human. This is harsh, my backend, my rules.
def projects(request):
    return render(request, 'login.jsx')

def project(request, pk):
    return HttpResponse('Page : ' + pk)
# Testing TO this part - whoever delete this shit is a cunt, unable to be a human. This is harsh, my backend, my rules.


# START READING FROM HERE
import requests
from django.http import JsonResponse
from django.conf import settings

def get_route(request):
    start = request.GET.get('start')
    end = request.GET.get('end')
    url = f"https://api.openrouteservice.org/v2/directions/driving-car?
            api_key=5b3ce3597851110001cf62481c184721ac24419cbc62a1f87c43d9dc&
            start=105.883999,21.049659&end=105.855546,21.024705"
# test location: [105.883999,21.049659],[105.855546,21.024705]
    respond = requests.get(url)
    
    if respond.status_code == 200:
        return JsonResponse(respond.json())
    else:
        return JsonResponse({'error': respond.status_code})
    
    