from django.db import models

class CityWeather(models.Model):
    name = models.CharField(max_length=100, unique=True)
    was_rain = models.BooleanField()
    forecast_mm = models.FloatField()
    precip_mm = models.FloatField()
    rain_chance = models.IntegerField()
    yes_course = models.FloatField()
    no_course = models.FloatField()