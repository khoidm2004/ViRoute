import os
import django
import random
import pandas as pd
from faker import Faker
import bcrypt
import datetime


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "viroute.settings")
django.setup()

from virouteapp.models import Bus, Metro, Ticket, Account, User, UserTicket, AccountHasUser  

#Create user information setting IRL 
class UserInformation:
    def __init__(self, fullName, userEmail, phoneNumber, password, dateofbirth="27-01-2003"):
        self.fullName = fullName
        self.userEmail = userEmail
        self.phoneNumber = phoneNumber
        self.password = password
        self.__userID = f"{self.dateofbirth.strftime('%d%m%y')}{phoneNumber[-4:]}" #format userID: ddmmyy + last 4 digits of phone number. And make it private
        self.__balance = 0
        self.citizenship = "Vietnam"
        self.dateofbirth = datetime.strptime(dateofbirth, '%d%m%Y')
    
    def get_userID(self):
        return self.__userID
    
    def change_name(self, newName):
        self.fullName = newName
    
    def change_email(self, newEmail):
        self.userEmail = newEmail
    
    def change_passweord(self, password):
        self.password = password
        
    def change_phone(self, newPhone):
        self.phoneNumber = newPhone
        
    def add_balance(self, amount):
        self.__balance += amount
        
    def get_balance(self):
        return self.__balance
    
    def __str__(self): #return user information
        return f"User: {self.fullName}\nEmail: {self.userEmail}\nPhone: {self.phoneNumber} \nDate of Birth: {self.dateofbirth}\nCitizenship: {self.citizenship}\nBalance: {self.__balance}"
    #etc ...


# Fake data
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
    used_bus_ids = set()
    for _ in range(num):
        while True:
            bus_id = fake.unique.random_int(min=1, max=999999)
            if bus_id not in used_bus_ids:
                used_bus_ids.add(bus_id)
                break
        bus = Bus.objects.create(
            bus_id=bus_id,
            route=fake.city(),
            plate_number=fake.unique.license_plate(),
        )
        data["Bus"].append({
            "bus_id": bus.bus_id,
            "route": bus.route,
            "plate_number": bus.plate_number,
        })

def create_fake_metros(num):
    used_metro_ids = set()
    for _ in range(num):
        while True:
            metro_id = fake.unique.random_int(min=1, max=999999)
            if metro_id not in used_metro_ids:
                used_metro_ids.add(metro_id)
                break
        metro = Metro.objects.create(
            metro_id=metro_id,
            route=fake.city(),
            plate_number=fake.unique.license_plate(),
        )
        data["Metro"].append({
            "metro_id": metro.metro_id,
            "route": metro.route,
            "plate_number": metro.plate_number,
        })

def create_fake_tickets(num):
    used_ticket_ids = set()
    for _ in range(num):
        while True:
            ticket_id = fake.unique.random_int(min=1, max=9999)
            if ticket_id not in used_ticket_ids:
                used_ticket_ids.add(ticket_id)
                break
        ticket = Ticket.objects.create(
            ticketID=ticket_id,
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
    used_account_ids = set()
    for _ in range(num):
        while True:
            account_id = fake.unique.random_int(min=1, max=9999)
            if account_id not in used_account_ids:
                used_account_ids.add(account_id)
                break
        account = Account.objects.create(
            accountID=account_id,
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
    used_user_ids = set()
    for _ in range(num):
        while True:
            date_of_birth = fake.date_of_birth(minimum_age=18, maximum_age=70)
            formatted_dob = date_of_birth.strftime('%d%m%Y')
            phone_number = fake.phone_number()
            last_four_digits = phone_number[-4:]
            raw_password = fake.password()
            hashed_password = bcrypt.hashpw(raw_password.encode('utf-8'), bcrypt.gensalt())
            
            user_id = f"{formatted_dob}{last_four_digits}"
            
            if user_id not in used_user_ids:
                used_user_ids.add(user_id)
                break
        user = User.objects.create(
            userID=user_id,
            fullName=fake.name(),
            phoneNumber=phone_number,
            userEmail=fake.unique.email(),
            password=hashed_password.decode('utf-8'),
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
            "password": raw_password
        })

def create_fake_user_tickets(num):
    users = list(User.objects.all())
    tickets = list(Ticket.objects.all())
    created_entries = set()

    for _ in range(num):
        if not users or not tickets:
            break
        while True:
            user = random.choice(users)
            ticket = random.choice(tickets)
            if (user.userID, ticket.ticketID) not in created_entries:
                created_entries.add((user.userID, ticket.ticketID))
                break
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
    created_entries = set()

    for _ in range(num):
        if not accounts or not users:
            break
        while True:
            account = random.choice(accounts)
            user = random.choice(users)
            if (account.accountID, user.userID) not in created_entries:
                created_entries.add((account.accountID, user.userID))
                break
        account_has_user = AccountHasUser.objects.create(
            account=account,
            user=user,
        )
        data["AccountHasUser"].append({
            "account": account.accountID,
            "user": user.userID,
        })

if __name__ == "__main__":
    create_fake_buses(5)      
    create_fake_metros(5)     
    create_fake_tickets(10)    
    create_fake_accounts(10)   
    create_fake_users(10)      
    create_fake_user_tickets(10)  
    create_fake_account_has_user(10)
    # Save data to csv
    if data["User"]:
        df = pd.DataFrame(data["User"])
        df.to_csv('users.csv', index=False)