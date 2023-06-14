from django.apps import AppConfig
from .scheduler import Command


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self): # Import Twojego polecenia
        from api.models import CityWeather
        Command().handle()  # Uruchom Twoje polecenie


