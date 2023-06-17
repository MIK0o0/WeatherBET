import json
from api.models import CityWeather
import requests

def download_weather_info(func):
    # Otwieranie pliku JSON
    with open('data/cities.json') as file:
        data = json.load(file)

    # Pobieranie wartości "API_NAME" z tabeli "features"
    features = data
    for feature in features:
        api_name = feature['properties']['API_NAME']
        city_name = feature['properties']['NAME']
        url = f"http://api.weatherapi.com/v1/forecast.json?key=593d074049784d83b7290616231306&q={api_name}&days=2&aqi=no&alerts=no"

        response = requests.get(url)
        data = response.json()
        func(data, api_name)
        print(api_name)


def calculate_course(chance):
    if chance != 0:
        return round(1/(chance/100),2)
    else: 
         return 0



def update_forecast(name, forecast_mm, rain_chance, yes_course, no_course):
    try:
        # Sprawdzenie, czy istnieje rekord o podanym name
        record = CityWeather.objects.get(name=name)
        
        # Aktualizacja wartości dla istniejącego rekordu
        record.forecast_mm = forecast_mm
        record.rain_chance = rain_chance
        record.yes_course = yes_course
        record.no_course = no_course
        print(record)
        # Zapisanie zmian
        record.save()
    except CityWeather.DoesNotExist:
        # Dodanie nowego rekordu, jeśli nie istnieje rekord o podanym name
        CityWeather.objects.create(
            name=name,
            was_rain=False,
            forecast_mm=forecast_mm,
            precip_mm=0,
            rain_chance=rain_chance,
            yes_course=yes_course,
            no_course=no_course
        )

def update_perciption(name, precip_mm):
    try:
        # Sprawdzenie, czy istnieje rekord o podanym name
        record = CityWeather.objects.get(name=name)
        
        # Aktualizacja wartości dla istniejącego rekordu
        record.precip_mm= precip_mm
        
        # Zapisanie zmian
        record.save()
    except CityWeather.DoesNotExist:
        # Dodanie nowego rekordu, jeśli nie istnieje rekord o podanym name
        CityWeather.objects.create(
            name=name,
            was_rain=False,
            forecast_mm=0,
            precip_mm=precip_mm,
            rain_chance=0,
            yes_course=0,
            no_course=0
        )


def send_request_forecast(data, city_name):
        
        forecast_precip = data["forecast"]["forecastday"][0]["day"]["totalprecip_mm"]
        daily_chance_of_rain = data["forecast"]["forecastday"][0]["day"]["daily_chance_of_rain"]
        update_forecast(city_name, forecast_precip, daily_chance_of_rain, calculate_course(daily_chance_of_rain), calculate_course(100-daily_chance_of_rain)) 


def send_request_preciption(data, city_name):
        
        current_precip = data["current"]["precip_mm"]
        update_perciption(city_name, current_precip)
    
def print_city_weather_records():
    # Pobranie wszystkich rekordów z tabeli CityWeather
    city_weather_records = CityWeather.objects.all()

    # Iteracja przez rekordy i wypisanie informacji
    for record in city_weather_records:
        print(f"Name: {record.name}")
        print(f"Was Rain: {record.was_rain}")
        print(f"Forecast (mm): {record.forecast_mm}")
        print(f"Precipitation (mm): {record.precip_mm}")
        print(f"Rain Chance: {record.rain_chance}")
        print(f"Yes Course: {record.yes_course}")
        print(f"No Course: {record.no_course}")
        print("-----------------------------------")