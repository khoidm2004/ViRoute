from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Login authen
from django.core.exceptions import MultipleObjectsReturned
from allauth.socialaccount.models import SocialAccount
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView


# Testing FROM this part - whoever delete this shit is a cunt, unable to be a human. This is harsh, my backend, my rules.
def projects(request):
    return render(request, 'login.jsx')

def project(request, pk):
    return HttpResponse('Page : ' + pk)
# Testing TO this part - whoever delete this shit is a cunt, unable to be a human. This is harsh, my backend, my rules.


# START READING FROM HERE
import requests
from django.conf import settings

#Get route/ map API
def get_route(request):
    start = request.GET.get('start')
    end = request.GET.get('end')
    url = f"https://api.openrouteservice.org/v2/directions/driving-car?
            api_key=5b3ce3597851110001cf62481c184721ac24419cbc62a1f87c43d9dc&
            start=105.883999,21.049659&end=105.855546,21.024705"
# test location: [105.883999,21.049659],[105.855546,21.024705]
    respond = requests.get(url) # Request API from this
    
    if respond.status_code == 200:
        return JsonResponse(respond.json())
    else:
        return JsonResponse({'error': respond.status_code})


class GitHubLogin(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    callback_url = "http://localhost:8000/accounts/github/login/callback/"
    client_class = OAuth2Client

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except MultipleObjectsReturned:
            # Get Github account from all users
            user = request.user
            accounts = SocialAccount.objects.filter(user=user, provider='github')
            account_list = [{"id": account.id, "username": account.username} for account in accounts]

            return JsonResponse({
                'error': 'Nhiều tài khoản GitHub đã được liên kết với tài khoản này.',
                'accounts': account_list,  # Return accounts list
            }, status=400)

        except Exception as e:
            return JsonResponse({
                'error': str(e),
            }, status=500)
