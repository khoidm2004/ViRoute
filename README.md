# ViRoute

ViRoute is a web application built using Django and Django REST framework. It provides functionalities for route management, and make a lot of MONEYYYYYY

## Features

- Route management using OpenRouteService API
- JWT authentication for REST API
- MySQL database integration

## Requirements

- Python 3.12.6
- Django 5.1.2
- MySQL

## Installation and configuration

1. Clone the repository:

    ```bash
    git clone https://github.com/khoidm2004/ViRoute
    git checkout -b Backend # Switch to the Backend branch
    ```

2. Create a virtual environment and activate it:

    ```bash
    python -m venv venv
    source venv/bin/activate
    ```

    For Windows:

    ```bash
    python -m venv venv
    venv\Scripts\activate
    ```

3. Install the required packages:

    ```bash
    pip install -r requirements.txt
    ```

4. Install MySQL and create a database:

    Download link:
    - [MySQL Community Server](https://dev.mysql.com/downloads/installer/)
    - Select Version: 8.0.40
    - Select Operating System: MS Windows
    - Select the installer: Windows (x86, 32-bit), MSI Installer - 8.0.40 (The file size is 300MB+)
    
    or
    - [Click here to download](https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-8.0.40.0.msi)
    
    Open MySQL Command Line Client and run the following commands:
    ```sql
    CREATE DATABASE viroute;
    USE viroute;
    ```

5. Apply the migrations:

    ```bash
    cd viroute
    python manage.py migrate
    python manage.py makemigrations
    ```

6. Create a superuser:

    ```bash
    python manage.py createsuperuser
    ```
    Enter your username, email, and password.
    The usage of this is login to the admin page in localhost:8000/admin

7. Configuration of OpenRouteService API:

    - Go to [OpenRouteService](https://openrouteservice.org/sign-up/) and sign up for an account.
    - After signing up, go to the dashboard and copy the API key.
    - Create a `.env` file in the root directory and add the following line:

    ```env
    OPENROUTE_API_KEY=your_api_key
    ```

    Replace `your_api_key` with the API key you copied.

8. Configuration MySQL database:

Update the `viroute/settings.py` file with your MySQL database credentials:

```py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'viroute',
        'USER': 'root',
        'PASSWORD': 'your_password', # your_password means your password ^_^! 
        'HOST': '127.0.0.1',
        'PORT': '3306', # Default port of MySQL, if it is not work, change into 8000
    }
}
```

9. Run the development server:

```bash
python manage.py runserver
```
