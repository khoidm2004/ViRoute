from django.contrib import admin
from .models import Bus, Metro, Ticket, Account, User, UserTicket, AccountHasUser

admin.site.register(Ticket)
admin.site.register(User)
admin.site.register(Bus)
admin.site.register(Metro)
admin.site.register(Account)
admin.site.register(UserTicket)
admin.site.register(AccountHasUser)


#create superuser to access admin page
'''
python manage.py createsuperuser
python manage.py runserver
'''