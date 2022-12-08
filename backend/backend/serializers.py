from .models import FencerModel, TournamentModel, CompetitionModel, WeaponControlModel
from rest_framework import serializers

class FencerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FencerModel
        fields =  [
            'id', 
            'competition',
            'nom',
            'pre_nom',
            'sexe',
            'lateralite',
            'nation',
            'club',
            'licence',
            'statut',
            'date_naissance',
            'classement',
            'points',
            'barcode',
            'registration_status',
        ]

class TournamentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TournamentModel
        fields = [
            'title_long',
            'starting_date',
            'ending_date',
        ]
        
class CompetitionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CompetitionModel
        fields = [
            'assoc_tournament_id',
            'title_long',
            'weapon_type',
            'is_wheelchair',
            'sex',
            'type',
            'age_group',
            'host_country',
            'address',
            'entry_fee',
            'currency',
            'start_date',
            'end_date',
        ]

class WeaponControlSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = WeaponControlModel
        fields = [
            'assoc_fencer_id',
            'assoc_competition_id',
            'notes'
        ]