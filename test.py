import requests

api_url = "http://127.0.0.1:8000/api/login/"  

#example for sign in
data = {
    "userEmail": "destinyblack@example.com",
    "password": "Z^01IbCjS)"
}

#example for sign up
'''
{
    "userEmail": "thongngunhuconlon@gmail.com",
    "fullName": "Thong",
    "phoneNumber": "+84961697918",
    "password":"conmevailonthat"
    }
'''


response = requests.post(api_url, json=data)

if response.status_code == 200:
    print("login successful:", response.json())
else:
    print("error:", response.status_code, response.text)