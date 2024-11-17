from django.core.management.base import BaseCommand
from virouteapp.models import Ticket, Bus, Metro

# Create Bus and Metro
bus = Bus.objects.create(name="Bus 1")
metro = Metro.objects.create(name="Metro A")

# Create Ticket linked with Bus
ticket_bus = Ticket.objects.create(
    ticketID=1,
    departurePoint="Hà Nội",
    destinationPoint="Hải Phòng",
    price=100.50,
    distance="100 km",
    paymentMethod="Credit Card",
    departureTime="2024-11-17 08:00:00",
    destinationTime="2024-11-17 10:00:00",
    bus=bus
)

# Create Ticket linked with Metro
ticket_metro = Ticket.objects.create(
    ticketID=2,
    departurePoint="Đà Nẵng",
    destinationPoint="Quảng Nam",
    price=50.00,
    distance="30 km",
    paymentMethod="Cash",
    departureTime="2024-11-17 09:00:00",
    destinationTime="2024-11-17 09:30:00",
    metro=metro
)

class Command(BaseCommand):
    def handle(self, *arg, **kawrgs):
        Ticket.objects.create(title="Ticket 1", decription="Creating through command")
        self.stdout.write(self.style.SUCCESS("Data created successfully"))
        # python manage.py create_data
        # python manage.py runserver
    
    def printTicket(self):
        for ticket in Ticket.objects.all():
            print(ticket)
    
    def printBus(self):
        for bus in Bus.objects.all():
            print(bus)
    
    def printMetro(self):
        for metro in Metro.objects.all():
            print(metro)
            
    def updateData(self): #example of updating data
        ticket = Ticket.objects.get(ticketID=1)
        ticket.price = 150.00
        ticket.save()
        print(ticket)
        
    def deleteData(self): #example of deleting data (ticket with ticketID=2)
        ticket = Ticket.objects.get(ticketID=2)
        ticket.delete()
        print("Ticket deleted")