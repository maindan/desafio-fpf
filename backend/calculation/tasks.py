from celery import  shared_task
from rest_framework.generics import get_object_or_404
from .models import Processamento
import statistics
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

@shared_task
def calculation(process_id:int):
    try:
        processamento = get_object_or_404(Processamento, id=process_id)

        send_ws_update(process_id, {"status": "Em andamento"})
        
        processamento.media = statistics.mean([processamento.num1, processamento.num2, processamento.num3])
        processamento.mediana = statistics.median([processamento.num1, processamento.num2, processamento.num3])
        processamento.status = "Concluído"
        processamento.save()

        send_ws_update(process_id, {
            "status": "Concluído",
            "media": processamento.media,
            "mediana": processamento.mediana
        })

        return(processamento)
    except Exception as e:
        send_ws_update(process_id, {"status": "Erro", "mensagem": str(e)})

def send_ws_update(process_id, message):
    channel_layer = get_channel_layer()
    print(f"🔹 Enviando WebSocket para task_{process_id}: {message}")
    async_to_sync(channel_layer.group_send)(
        f"task_{process_id}",
        {
            "type": "task_update",
            "data": message
        }
    )