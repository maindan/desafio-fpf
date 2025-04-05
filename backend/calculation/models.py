from django.db import models

class Processing(models.Model):
    num1 = models.FloatField()
    num2 = models.FloatField()
    num3 = models.FloatField()
    status = models.TextField(max_length=20)
    media = models.FloatField(null=True)
    mediana = models.FloatField(null=True)