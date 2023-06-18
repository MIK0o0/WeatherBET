from apscheduler.schedulers.background import BackgroundScheduler
from django.core.management.base import BaseCommand




class Command(BaseCommand):
    help = 'Scheduler command'

    def handle(self, *args, **options):
        # Tutaj możesz zdefiniować funkcję, która będzie wykonywana cyklicznie

        def download_forecast():
            import api.weather_update as wu
            wu.download_weather_info(wu.send_request_forecast)
            #download_weather_info(send_request_forecast)
            print("Wykonywanie zadania...")
            wu.print_city_weather_records()

        # Inicjalizacja schedulera
        scheduler = BackgroundScheduler()

        # Dodajemy zadanie, które będzie wykonywane codziennie o północy
        # scheduler.add_job(download_forecast, 'interval', seconds=300)

        # Dodajemy zadanie, które zostanie wykonane raz po uruchomieniu aplikacji
        # download_forecast()

        # Uruchamiamy schedulera
        scheduler.start()





        

