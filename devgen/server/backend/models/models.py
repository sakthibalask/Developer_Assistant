from backend.config.ApplicationConfiguration import ApplicationConfig as config


app_config = config()
db = app_config.db
