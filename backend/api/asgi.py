import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import calculation.api.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": URLRouter(calculation.api.routing.websocket_urlpatterns),
    }
)

