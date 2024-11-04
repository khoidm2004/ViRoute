import os
import django
import random
import pandas as pd
from faker import Faker

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")
django.setup()

from virouteapp.models import Bus, Metro, Ticket, Account, User, UserTicket, AccountHasUser  

fake = Faker()
data = {
    "Bus": [],
    "Metro": [],
    "Ticket": [],
    "Account": [],
    "User": [],
    "UserTicket": [],
    "AccountHasUser": [],
}

def create_fake_buses(num):
    for _ in range(num):
        bus = Bus.objects.create(
            bus_id=fake.unique.random_int(min=1, max=999999),
            route=fake.city(),
            plate_number=fake.license_plate(),
        )
        data["Bus"].append({
            "bus_id": bus.bus_id,
            "route": bus.route,
            "plate_number": bus.plate_number,
        })

def create_fake_metros(num):
    for _ in range(num):
        metro = Metro.objects.create(
            metro_id=fake.unique.random_int(min=1, max=999999),
            route=fake.city(),
            plate_number=fake.license_plate(),
        )
        data["Metro"].append({
            "metro_id": metro.metro_id,
            "route": metro.route,
            "plate_number": metro.plate_number,
        })

def create_fake_tickets(num):
    for _ in range(num):
        ticket = Ticket.objects.create(
            ticketID=fake.unique.random_int(min=1, max=9999),
            departurePoint=fake.city(),
            destinationPoint=fake.city(),
            price=round(fake.random_number(digits=4) / 100, 2),  
            distance=str(fake.random_int(min=1, max=100)),  
            paymentMethod=fake.random_element(elements=("Cash", "Credit Card", "PayPal")),
            departureTime=fake.date_time(),
            destinationTime=fake.date_time(),
            bus=random.choice(Bus.objects.all()),
            metro=random.choice(Metro.objects.all()),
        )
        data["Ticket"].append({
            "ticketID": ticket.ticketID,
            "departurePoint": ticket.departurePoint,
            "destinationPoint": ticket.destinationPoint,
            "price": ticket.price,
            "distance": ticket.distance,
            "paymentMethod": ticket.paymentMethod,
            "departureTime": ticket.departureTime,
            "destinationTime": ticket.destinationTime,
        })

def create_fake_accounts(num):
    for _ in range(num):
        account = Account.objects.create(
            accountID=fake.unique.random_int(min=1, max=9999),
            paymentHistory=fake.text(max_nb_chars=200),
            purchaseHistory=fake.text(max_nb_chars=200),
            topUpHistory=fake.text(max_nb_chars=200),
            balance=round(fake.random_number(digits=4) / 100, 2),  
        )
        data["Account"].append({
            "accountID": account.accountID,
            "paymentHistory": account.paymentHistory,
            "purchaseHistory": account.purchaseHistory,
            "topUpHistory": account.topUpHistory,
            "balance": account.balance,
        })

def create_fake_users(num):
    for _ in range(num):
        date_of_birth = fake.date_of_birth(minimum_age=18, maximum_age=70)
        formatted_dob = date_of_birth.strftime('%d%m%Y')
        phone_number = fake.phone_number()
        last_four_digits = phone_number[-4:]

        user_id = f"{formatted_dob}{last_four_digits}"

        user = User.objects.create(
            userID=user_id,
            fullName=fake.name(),
            phoneNumber=phone_number,
            userEmail=fake.unique.email(),
            balance=round(fake.random_number(digits=4) / 100, 2), 
            citizenship=fake.country(),
            dateofbirth=date_of_birth,
        )
        data["User"].append({
            "userID": user.userID,
            "fullName": user.fullName,
            "phoneNumber": user.phoneNumber,
            "userEmail": user.userEmail,
            "balance": user.balance,
            "citizenship": user.citizenship,
        })

def create_fake_user_tickets(num):
    users = list(User.objects.all())
    tickets = list(Ticket.objects.all())

    for _ in range(num):
        if not users or not tickets:
            break

        user = random.choice(users)
        ticket = random.choice(tickets)

        user_ticket = UserTicket.objects.create(
            user=user,
            ticket=ticket,
        )
        data["UserTicket"].append({
            "user": user.userID,
            "ticket": ticket.ticketID,
        })

def create_fake_account_has_user(num):
    accounts = list(Account.objects.all())
    users = list(User.objects.all())
    created_entries = set()  # To keep track of created (account, user) pairs

    for _ in range(num):
        if not accounts or not users:
            break
        while True:
            account = random.choice(accounts)
            user = random.choice(users)

            # Check if this combination already exists
            if (account.accountID, user.userID) not in created_entries:
                account_has_user = AccountHasUser.objects.create(
                    account=account,
                    user=user,
                )
                data["AccountHasUser"].append({
                    "account": account.accountID,
                    "user": user.userID,
                })
                created_entries.add((account.accountID, user.userID))  # Record the created combination
                break  # Exit the while loop to go to the next iteration


if __name__ == "__main__":
    create_fake_buses(5)      
    create_fake_metros(5)     
    create_fake_tickets(10)    
    create_fake_accounts(10)   
    create_fake_users(10)      
    create_fake_user_tickets(10)  
    create_fake_account_has_user(10)  