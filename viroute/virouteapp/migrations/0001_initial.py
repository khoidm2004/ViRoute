# Generated by Django 5.1.2 on 2024-11-16 13:14

import django.core.validators
import django.db.models.deletion
import phonenumber_field.modelfields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Account",
            fields=[
                (
                    "accountID",
                    models.IntegerField(
                        primary_key=True,
                        serialize=False,
                        unique=True,
                        validators=[django.core.validators.MaxValueValidator(15)],
                    ),
                ),
                ("paymentHistory", models.CharField(max_length=255)),
                ("purchaseHistory", models.CharField(max_length=255)),
                ("topUpHistory", models.CharField(max_length=255)),
                (
                    "balance",
                    models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Bus",
            fields=[
                ("route", models.CharField(max_length=100)),
                ("plate_number", models.CharField(max_length=20, unique=True)),
                (
                    "bus_id",
                    models.CharField(max_length=20, primary_key=True, serialize=False),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Metro",
            fields=[
                ("route", models.CharField(max_length=100)),
                ("plate_number", models.CharField(max_length=20, unique=True)),
                (
                    "metro_id",
                    models.CharField(max_length=20, primary_key=True, serialize=False),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="AccountHasUser",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "account",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="virouteapp.account",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Ticket",
            fields=[
                (
                    "ticketID",
                    models.IntegerField(
                        primary_key=True,
                        serialize=False,
                        unique=True,
                        validators=[django.core.validators.MaxValueValidator(16)],
                    ),
                ),
                ("departurePoint", models.CharField(max_length=50)),
                ("destinationPoint", models.CharField(max_length=50)),
                (
                    "price",
                    models.DecimalField(decimal_places=2, default=0.0, max_digits=4),
                ),
                ("distance", models.CharField(max_length=10)),
                ("paymentMethod", models.CharField(max_length=30)),
                ("departureTime", models.DateTimeField()),
                ("destinationTime", models.DateTimeField()),
                (
                    "bus",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="tickets",
                        to="virouteapp.bus",
                    ),
                ),
                (
                    "metro",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="tickets",
                        to="virouteapp.metro",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "userID",
                    models.CharField(
                        max_length=40, primary_key=True, serialize=False, unique=True
                    ),
                ),
                ("fullName", models.CharField(max_length=255)),
                (
                    "phoneNumber",
                    phonenumber_field.modelfields.PhoneNumberField(
                        max_length=128,
                        region=None,
                        unique=True,
                        validators=[django.core.validators.MinLengthValidator(10)],
                    ),
                ),
                ("userEmail", models.EmailField(max_length=100, unique=True)),
                (
                    "balance",
                    models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
                ),
                ("citizenship", models.CharField(default="Vietnam", max_length=100)),
                ("dateofbirth", models.DateField(default="2003-12-15")),
                ("password", models.CharField(max_length=70)),
                (
                    "accounts",
                    models.ManyToManyField(
                        through="virouteapp.AccountHasUser", to="virouteapp.account"
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="accounthasuser",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="virouteapp.user"
            ),
        ),
        migrations.CreateModel(
            name="UserTicket",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "ticket",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="virouteapp.ticket",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="virouteapp.user",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="user",
            name="tickets",
            field=models.ManyToManyField(
                through="virouteapp.UserTicket", to="virouteapp.ticket"
            ),
        ),
        migrations.AddConstraint(
            model_name="accounthasuser",
            constraint=models.UniqueConstraint(
                fields=("account", "user"), name="unique_account_user"
            ),
        ),
        migrations.AddConstraint(
            model_name="userticket",
            constraint=models.UniqueConstraint(
                fields=("ticket", "user"), name="unique_ticket_user"
            ),
        ),
    ]
