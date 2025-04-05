from rest_framework.views import APIView
from rest_framework.response import Response
from calculation.models import Processamento
from calculation.api.serializers import ProcessamentoSerializer
class ProcessamentoView(APIView):
    def post(self, request):
        serializer = ProcessamentoSerializer(data=request.data)
        if serializer.is_valid():
            processamento = serializer.save(status="Processando...")
            return Response({"id":processamento.id, "status": processamento.status})
        else:
            return Response(serializer.errors, status=400)
        