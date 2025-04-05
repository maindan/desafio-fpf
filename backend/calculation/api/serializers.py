from rest_framework import serializers
from calculation.models import Processamento

class ProcessamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Processamento
        fields = '__all__'