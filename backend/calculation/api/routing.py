from django.urls import re_path
from calculation.views import ProcessamentoView

websocket_urlpatterns = [
    re_path(r'/status/(?P<task_id>\d+)/$', ProcessamentoView.as_asgi()),
]