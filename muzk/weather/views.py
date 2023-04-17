from django.shortcuts import render
from django.http import HttpResponse

import os
import requests

import environ
# Initialise environment variables
env = environ.Env()
environ.Env.read_env()


def index(request):
    return render(request, "weather/choice.html", 
                  context={
                    "city": '',
                    "temp": .1
                  })


def get_weather(request, city):
    api_key = os.getenv('WEATHERAPI')

    res = requests.get("http://api.openweathermap.org/data/2.5/find",
                       params={'q': city, 'type': 'like',
                               'units': 'metric', 'APPID': api_key})
    data = res.json()
    temp = data['list'][0]['main']['temp']
    return render(request, "weather/choice.html",
                  context={
                      "city": city,
                      "temp": temp
                  })
