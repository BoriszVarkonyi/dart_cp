from .models import FencerModel, TournamentModel, CompetitionModel, WeaponControlModel, RegistrationModel, PisteModel, EquipmentModel, IndividualFormulaModel, GivenEquipmentModel
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class FencerSerializer(serializers.ModelSerializer):
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
        ]

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TournamentModel
        fields = [
            'id',
            'title_long',
            'starting_date',
            'ending_date',
        ]
        
class CompetitionSerializer(serializers.ModelSerializer):
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

class WeaponControlSerializer(serializers.ModelSerializer):
    class Meta:
        # BORISZ: ha átírod depth 1-re nem működik a weapon control post and get
        # csinálj másikat ha nagyon kell a cucc
        depth = 0
        model = WeaponControlModel
        validators = [
            UniqueTogetherValidator(
                queryset=WeaponControlModel.objects.all(),
                fields = [
                    'competitions',
                    'fencers',
                ]
            )
        ]
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
            'issue_29',
            'issue_30',
            'issue_31',
            'issue_32',
            'issue_33',
            'issue_34',
            'issue_35',
            'notes'
        ]

class FencersCompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FencerModel
        fields = [
            'competitions',    
        ]

class WeaponControlIssuesSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeaponControlModel
        exclude = (
            'competitions',
            'fencers',
        )

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationModel
        validators = [
            UniqueTogetherValidator(
                queryset=RegistrationModel.objects.all(),
                fields = [
                    'competitions',
                    'fencers',
                ]
            )
        ]
        fields = (
            'competitions',
            'fencers',
            'registered',
        )


class FencerNationSerializer(serializers.ModelSerializer):
    class Meta:
        depth = 1;
        model = FencerModel
        fields = [
            'nation',    
        ]

class WeaponControlNationSerializer(serializers.ModelSerializer):
    class Meta:
        depth = 1
        model = WeaponControlModel
        validators = [
            UniqueTogetherValidator(
                queryset=WeaponControlModel.objects.all(),
                fields = [
                    'competitions',
                    'fencers',
                ]
            )
        ]
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
            'issue_29',
            'issue_30',
            'issue_31',
            'issue_32',
            'issue_33',
            'issue_34',
            'issue_35',
            'notes'
        ]


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['name'] = user.username
        return token

class CompetitorsDataSerializer(serializers.ModelSerializer):
    reg_status = serializers.SerializerMethodField()
    wc_status = serializers.SerializerMethodField()

    class Meta:
        model = FencerModel
        fields = '__all__'

    def get_reg_status(self, obj):

        competition = self.context.get('competition')

        queryset = RegistrationModel.objects.filter(fencers=obj.id, competitions=competition, registered=True).exists()

        return queryset
    
    def get_wc_status(self, obj):

        competition = self.context.get('competition')
    
        queryset = WeaponControlModel.objects.filter(fencers=obj.id, competitions=competition).exists()

        return queryset

class PisteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PisteModel
        fields = [
            'competitions',
            'name',
            'color',
            'is_active'
        ]

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentModel 
        fields = [
            'competitions',
            'mask',
            'underplastron',
            'chest_protector',
            'jacket',
            'electric_jacket',
            'glove',
            'breeches',
            'socks',
            'weapon',
            'bodywire',
            'maskwire'
        ]


class IndividualFormulaSerializer(serializers.ModelSerializer):
    class Meta:
        model =  IndividualFormulaModel
        fields = [ 
            'competitions',
            'pool_points',
            'table_points',
            'elimination_type',
            'separation_type',
            'direct_elimination_type',
            'third_place',
            'callroom',
            'callroom_number' 
        ]


class GivenEquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GivenEquipmentModel 
        fields = [
            'competitions',
            'fencers',
            'isready',
            'mask',
            'underplastron',
            'chest_protector',
            'jacket',
            'electric_jacket',
            'glove',
            'breeches',
            'socks',
            'weapon',
            'bodywire',
            'maskwire'
        ]




