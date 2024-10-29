from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def projects(request):
    return render(request, 'login.jsx')

def project(request, pk):
    return HttpResponse('Page : ' + pk)


