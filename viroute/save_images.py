import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "viroute.settings")  
django.setup()

from virouteapp.models import Image  

image_name = [
    "01_mobile", "01_web", "02_mobile", "02_web", "03A_mobile", "03A_web",
    "03B_mobile", "03B_web", "04_mobile", "04_web", "05_mobile", "05_web",
    "06A_mobile", "06A_web", "06B_mobile", "06B_web", "06C_mobile", "06C_web",
    "06D_mobile", "06D_web", "06E_mobile", "06E_web", "07_mobile", "07_web",
    "12_mobile", "12_web", "15_mobile", "15_web", "19_mobile", "19_web",
    "21A_mobile", "21A_web", "26_mobile", "26_web", "30_mobile", "30_web",
    "36_mobile", "36_web", "47A_mobile", "47A_web"
]

for i in image_name: 
# Load and save image 
    image = Image(image_name=i, image_path=i+'.png')
    image.save()