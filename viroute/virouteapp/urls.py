from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.projects),
    path('project/<str:pk>', views.project),
    path('get_route', views.get_route, name = 'get_route'),
    path('ticket', views.ticketList, name = 'ticket_list'),
    path('', include('virouteapp.urls')),
    path('api/bus_routes/', views.get_bus_routes, name='get_bus_routes'),
    path('api/submit_feedback/', views.submit_feedback, name='submit_feedback')
]