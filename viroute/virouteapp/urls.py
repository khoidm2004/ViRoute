from django.contrib import admin
from django.urls import path, include
from virouteapp.views import UserLoginView  # Import view for CSRF token
from virouteapp import views
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API Routes
    path('api/login/', views.UserLoginView.as_view(), name='login'),
    
    # Sign up and user info update
    path('signup/', views.signup, name='signup'),
    path('update_user/<str:user_id>/', views.update_user_info, name='update_user_info'),
    
    # Ticket management
    path('tickets/', views.ticket_list, name='tickets'),
    path('get_image/<str:image_name>/', views.get_image_by_name, name='get_image_by_name'),
    
    # Password reset routes
    path('auth/', include('virouteapp.urls')),
    path('api/bus_routes/', views.get_bus_routes, name='get_bus_routes'),
    
    path('api/bus_routes/filter/',views.get_bus_routes_by_start_and_end, name='get_bus_routes_by_start_and_end'),
    path('fav-place/create/', views.create_fav_place, name='create_fav_place'),
    path('fav-place/<int:user_id>/', views.get_fav_place, name='get_fav_place'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
