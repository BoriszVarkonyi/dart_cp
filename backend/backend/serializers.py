from .models import Fencer
from rest_framework import serializers

class FencerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Fencer
        fields = ['id', 'name', 'age', 'country', 'sex']