from django.contrib import admin
from django.urls import path, include
from virouteapp.views import UserLoginView
from virouteapp import views
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', UserLoginView.as_view(), name='login'),
    path('signup/', views.signup, name='signup'),
    path('tickets/', views.ticketList, name='tickets'),
    path('get_image/<str:image_name>/', views.get_image_by_name, name='get_image_by_name'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)