import requests

api_url = "http://127.0.0.1:8000/api/login/"  

data = {
    "userEmail": "destinyblack@example.com",
    "password": "Z^01IbCjS)"
}

response = requests.post(api_url, json=data)

if response.status_code == 200:
    print("login successful:", response.json())
else:
    print("error:", response.status_code, response.text)