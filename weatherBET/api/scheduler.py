from apscheduler.schedulers.background import BackgroundScheduler
from django.core.management.base import BaseCommand
from apscheduler.triggers.cron import CronTrigger




class Command(BaseCommand):
    help = 'Scheduler command'

    def handle(self, *args, **options):
        # Tutaj możesz zdefiniować funkcję, która będzie wykonywana cyklicznie

        def download_forecast():
            import api.weather_update as wu
            wu.download_weather_info(wu.send_request_forecast)
            
        def download_perciption():
            import api.weather_update as wu
            wu.download_weather_info(wu.send_request_preciption)
        
        def dispose_rewards():
            import api.tasks as tasks
            tasks.add_rewards()
            print(tasks.get_user_rewards_today())

        # Inicjalizacja schedulera
        scheduler = BackgroundScheduler()

        triggerForecast = CronTrigger(minute=1, hour=0)
        scheduler.add_job(download_forecast, triggerForecast)

        triggerPerciption = CronTrigger(minute=55, hour=23)
        scheduler.add_job(download_perciption, triggerPerciption)
        
        triggerReward = CronTrigger(minute=5, hour=0)
        scheduler.add_job(dispose_rewards, triggerReward)
        
        ### tasks at start:
        download_forecast()
        download_perciption()

        # Uruchamiamy schedulera
        scheduler.start()





        

