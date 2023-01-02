from .models import FencerModel, TournamentModel, CompetitionModel, WeaponControlModel
from rest_framework import serializers

class FencerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FencerModel
        fields =  [
            'id', 
            'competitions',
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
            'id',
            'title_long',
            'starting_date',
            'ending_date',
        ]
        
class CompetitionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CompetitionModel
        fields = [
            'id',
            'tournaments',
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
            'fencers',
            'competitions',
            'issue_1',
            'issue_2',
            'issue_3',
            'issue_4',
            'issue_5',
            'issue_6',
            'issue_7',
            'issue_8',
            'issue_9',
            'issue_10',
            'issue_11',
            'issue_12',
            'issue_13',
            'issue_14',
            'issue_15',
            'issue_16',
            'issue_17',
            'issue_18',
            'issue_19',
            'issue_20',
            'issue_21',
            'issue_22',
            'issue_23',
            'issue_24',
            'issue_25',
            'issue_26',
            'issue_27',
            'issue_28',
            'notes'
        ]
