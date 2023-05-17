from rest_framework import viewsets, permissions

from ..models import *
from ..serializers import *

class IndividualFormulaViewSet(viewsets.ModelViewSet):
    queryset = IndividualFormulaModel.objects.all()
    serializer_class = IndividualFormulaSerializer
    permission_classes = [permissions.IsAuthenticated]