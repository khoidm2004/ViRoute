from django.contrib import admin
from .models import Bus, Metro, Ticket, Account, User, UserTicket, AccountHasUser

admin.site.register(Ticket)

#create superuser to access admin page
'''
python manage.py createsuperuser
python manage.py runserver
'''