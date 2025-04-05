from celery import  shared_task
from rest_framework.generics import get_object_or_404
from .models import Processamento
import statistics

@shared_task
def calculation(process_id:int):
    processamento = get_object_or_404(Processamento, id=process_id)
    processamento.media = statistics.mean([processamento.num1, processamento.num2, processamento.num3])
    processamento.mediana = statistics.median([processamento.num1, processamento.num2, processamento.num3])
    processamento.status = "Concluído"
    processamento.save()
    return(processamento)
