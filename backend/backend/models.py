from django.db import models
from backend.choices import *
class TournamentModel(models.Model):
    title_long = models.CharField(max_length=12)
    starting_date = models.DateField()
    ending_date = models.DateField()

class CompetitionModel(models.Model):
    assoc_tournament_id = models.ForeignKey(TournamentModel, on_delete=models.CASCADE)
    title_long = models.CharField(max_length=72)
    weapon_type = models.CharField(max_length=1, choices=WEAPON_CHOICE)
    is_wheelchair = models.BooleanField(default=False)
    sex = models.CharField(max_length=1, choices=SEX_CHOICE)
    type = models.CharField(max_length=1, choices=COMPETITION_TYPE_CHOICE)
    age_group = models.CharField(max_length=64)
    host_country = models.CharField(max_length=3, choices=NATION_CHOICE)
    address = models.CharField(max_length=128)
    entry_fee = models.IntegerField()
    currency = models.CharField(max_length=32) #coice for money
    start_date = models.DateField()
    end_date = models.DateField()

class FencerModel(models.Model):
    id = models.CharField(max_length=24,primary_key=True) # will be generated from FencerModel.nom + FencerModel.pre_nom + FencerModel.date_naissance
    competitions = models.ManyToManyField(CompetitionModel)
    nom = models.CharField(max_length=72)
    pre_nom = models.CharField(max_length=72)
    sexe = models.CharField(max_length=1, choices=SEX_CHOICE)
    lateralite = models.CharField(max_length=1, choices=LATERALITE_CHOICE)
    nation = models.CharField(max_length=3, choices=NATION_CHOICE)
    club = models.CharField(max_length=256)
    licence = models.CharField(max_length=12)
    statut = models.CharField(max_length=1)
    date_naissance = models.DateField()
    classement = models.IntegerField()
    points = models.IntegerField()
    barcode = models.IntegerField()
    registration_status = models.BooleanField(default=False)

class WeaponControlModel(models.Model):
    assoc_fencer_id = models.ForeignKey(FencerModel, on_delete=models.CASCADE)
    assoc_competition_id = models.ForeignKey(CompetitionModel, on_delete=models.CASCADE)

    #issues
    issue_1 = models.SmallIntegerField(null=True, verbose_name="FIE mark on blade")
    issue_2 = models.SmallIntegerField(null=True, verbose_name="Arm gap and weight")
    issue_3 = models.SmallIntegerField(null=True, verbose_name="Arm length")
    issue_4 = models.SmallIntegerField(null=True, verbose_name="Blade length")
    issue_5 = models.SmallIntegerField(null=True, verbose_name="Grip length")
    issue_6 = models.SmallIntegerField(null=True, verbose_name="Form and depth of the guard")
    issue_7 = models.SmallIntegerField(null=True, verbose_name="Guard oxydation/ deformation")
    issue_8 = models.SmallIntegerField(null=True, verbose_name="Excentricity of the blade")
    issue_9 = models.SmallIntegerField(null=True, verbose_name="Blade flexibility")
    issue_10 = models.SmallIntegerField(null=True, verbose_name="Curve on the blade")
    issue_11 = models.SmallIntegerField(null=True, verbose_name="Foucault current device")
    issue_12 = models.SmallIntegerField(null=True, verbose_name="Point and arm size")
    issue_13 = models.SmallIntegerField(null=True, verbose_name="Length/ condition of body/ mask wire")
    issue_14 = models.SmallIntegerField(null=True, verbose_name="Resistance of body/ mask wire")
    issue_15 = models.SmallIntegerField(null=True, verbose_name="Mask: FIE mark")
    issue_16 = models.SmallIntegerField(null=True, verbose_name="Mask: condition and insulation")
    issue_17 = models.SmallIntegerField(null=True, verbose_name="Mask: resistance (sabre/foil)")
    issue_18 = models.SmallIntegerField(null=True, verbose_name="Metallic jacket condition")
    issue_19 = models.SmallIntegerField(null=True, verbose_name="Metallic jacket resistance")
    issue_20 = models.SmallIntegerField(null=True, verbose_name="Sabre/ glove overlay condition")
    issue_21 = models.SmallIntegerField(null=True, verbose_name="Sabre glove overlay resistance")
    issue_22 = models.SmallIntegerField(null=True, verbose_name="Glove condition")
    issue_23 = models.SmallIntegerField(null=True, verbose_name="Foil chest protector")
    issue_24 = models.SmallIntegerField(null=True, verbose_name="Socks")
    issue_25 = models.SmallIntegerField(null=True, verbose_name="Incorrect name printing")
    issue_26 = models.SmallIntegerField(null=True, verbose_name="Incorrect national logo")
    issue_27 = models.SmallIntegerField(null=True, verbose_name="Commercial")
    issue_28 = models.SmallIntegerField(null=True, verbose_name="Other items")
    #end issues

    notes = models.TextField()

