from django.apps import AppConfig


class MainappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'MainApp'
    verbose_name = 'Сервис Мой Силант'

    def ready(self):
        """
        Выполняется при загрузке приложения.
        Здесь можно разместить код, который нужно выполнить при загрузке приложения.
        Например, регистрация сигналов или импорт задач Celery.
        """
        pass
