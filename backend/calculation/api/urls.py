from django.urls import path
from calculation.views import ProcessamentoView

urlpatterns = [
    path('processar', ProcessamentoView.as_view(), name="Processamento"),
    path("status/<int:process_id>", ProcessamentoView.as_view(), name="StatusProcessamento")
]