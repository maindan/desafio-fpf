from django.urls import re_path
from calculation.consumers import CalculationConsumer

websocket_urlpatterns = [
    re_path(r'^ws/status/(?P<process_id>\d+)/$', CalculationConsumer.as_asgi()),
]