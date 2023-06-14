import json
from api.models import CityWeather
import requests

def download_weather_info():
    # Otwieranie pliku JSON
    with open('data/cities.json') as file:
        data = json.load(file)

    # Pobieranie wartości "API_NAME" z tabeli "features"
    features = data['features']
    for feature in features:
        api_name = feature['properties']['API_NAME']
        print(api_name)

def calculate_course(chance):
    return 1/(chance/100)



def update_perciption(city_id, name, forecast_mm, rain_chance, yes_course, no_course):
    try:
        # Sprawdzenie, czy istnieje rekord o podanym name
        record = CityWeather.objects.get(name=name)
        
        # Aktualizacja wartości dla istniejącego rekordu
        record.forecast_mm = forecast_mm
        record.rain_chance = rain_chance
        record.yes_course = yes_course
        record.no_course = no_course
        
        # Zapisanie zmian
        record.save()
    except CityWeather.DoesNotExist:
        # Dodanie nowego rekordu, jeśli nie istnieje rekord o podanym name
        CityWeather.objects.create(
            city_id=city_id,
            name=name,
            was_rain=False,
            forecast_mm=forecast_mm,
            precip_mm=0,
            rain_chance=rain_chance,
            yes_course=yes_course,
            no_course=no_course
        )

def update_perciption(city_id, name, precip_mm):
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
            city_id=city_id,
            name=name,
            was_rain=False,
            forecast_mm=0,
            precip_mm=precip_mm,
            rain_chance=0,
            yes_course=0,
            no_course=0
        )
        
    
