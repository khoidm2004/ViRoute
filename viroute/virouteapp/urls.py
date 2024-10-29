from django.urls import path
from . import views

urlpatterns = [
    path('', views.projects),
    path('project/<str:pk>', views.project),
    path('get_route', views.get_route, name = 'get_route'),
]