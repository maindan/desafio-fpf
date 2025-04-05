from django.urls import path
from calculation.views import ProcessamentoView

urlpatterns = [
    path('processar', ProcessamentoView.as_view(), name="Processamento")
]