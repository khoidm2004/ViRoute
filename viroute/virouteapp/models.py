from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import MinLengthValidator,MaxValueValidator

class Vehicle(models.Model):
    route = models.CharField(max_length=100)
    plate_number = models.CharField(max_length=20, unique=True)

    class Meta:
        abstract = True

class Bus(Vehicle):
    bus_id = models.CharField(max_length=20, primary_key=True)

class Metro(Vehicle):
    metro_id = models.CharField(max_length=20, primary_key=True)

class Ticket(models.Model):
    ticketID = models.IntegerField(validators=[MaxValueValidator(16)],null=False,unique=True,primary_key=True)
    departurePoint = models.CharField(max_length=50,null=False,blank=False)
    destinationPoint = models.CharField(max_length=50,null=False,blank=False)
    price = models.DecimalField(max_digits=4, decimal_places=2, default=0.00,blank=False,null = False)
    distance = models.CharField(max_length=10,null=False,blank=False)
    paymentMethod = models.CharField(max_length=30,null=False,blank=False)
    departureTime = models.DateTimeField(null=False,blank=False)
    destinationTime= models.DateTimeField(null=False,blank=False)
    bus = models.ForeignKey(Bus, on_delete=models.CASCADE, null=True, blank=True, related_name='tickets')
    metro = models.ForeignKey(Metro, on_delete=models.CASCADE, null=True, blank=True, related_name='tickets')

class Account(models.Model):
    accountID = models.IntegerField(validators=[MaxValueValidator(15)],null=False,unique=True,primary_key=True)
    paymentHistory = models.CharField(max_length=255,null=False,blank = False)
    purchaseHistory = models.CharField(max_length=255,null=False,blank = False)
    topUpHistory = models.CharField(max_length=255,null=False,blank = False)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00,blank=False,null = False)
    



class User(models.Model):
    userID = models.CharField(max_length=40,unique=True,null=False,blank=False,primary_key=True)
    fullName = models.CharField(max_length=255,null=False,blank=False)
    phoneNumber = PhoneNumberField(unique=True, null=False, validators=[MinLengthValidator(10)],blank=False)
    userEmail = models.EmailField (max_length=100,unique=True,null=False,blank=False)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    citizenship = models.CharField(max_length=100,null=False,blank=False)
    accounts = models.ManyToManyField(Account, through='AccountHasUser')
    tickets = models.ManyToManyField(Ticket, through='UserTicket')
    dateofbirth = models.DateField(null=False, blank=False)
    password = models.CharField(max_length=70,null=False,blank=False)

class UserTicket(models.Model):
    ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta: # ensures that a combination of values across multiple fields must be unique within the database, preventing duplicates for that combination.
        constraints = [
            models.UniqueConstraint(fields=['ticket', 'user'], name='unique_ticket_user')
        ]

class AccountHasUser(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta: # ensures that a combination of values across multiple fields must be unique within the database, preventing duplicates for that combination.
        constraints = [
            models.UniqueConstraint(fields=['account', 'user'], name='unique_account_user')
        ]

    