from django.db import models
from backend.choices import *

class TournamentModel(models.Model):
    title_long = models.CharField(max_length=100)
    starting_date = models.DateField()
    ending_date = models.DateField()

class CompetitionModel(models.Model):
    tournaments = models.ForeignKey(TournamentModel, on_delete=models.CASCADE)
    title_long = models.CharField(max_length=72)
    weapon_type = models.CharField(max_length=1, choices=WEAPON_CHOICE)
    is_wheelchair = models.BooleanField(default=False)
    sex = models.CharField(max_length=1, choices=SEX_CHOICE)
    type = models.CharField(max_length=1, choices=COMPETITION_TYPE_CHOICE)
    age_group = models.CharField(max_length=64)
    host_country = models.CharField(max_length=3, choices=NATION_CHOICE)
    address = models.CharField(max_length=128)
    entry_fee = models.FloatField()
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
    points = models.FloatField()

class WeaponControlModel(models.Model):
    fencers = models.ForeignKey(FencerModel, on_delete=models.CASCADE)
    competitions = models.ForeignKey(CompetitionModel, on_delete=models.CASCADE)

    #issues
    issue_1 = models.SmallIntegerField(null=True, verbose_name="Jacket: Missing FIE mark",default=0)
    issue_2 = models.SmallIntegerField(null=True, verbose_name="Jacket: Incorrent name printing",default=0)
    issue_3 = models.SmallIntegerField(null=True, verbose_name="Breeches: Missing FIE mark",default=0)
    issue_4 = models.SmallIntegerField(null=True, verbose_name="Breeches: Incorrect logo printing",default=0)
    issue_5 = models.SmallIntegerField(null=True, verbose_name="Plastron: Missing FIE mark",default=0)
    issue_6 = models.SmallIntegerField(null=True, verbose_name="Plastron: Bad condition",default=0)
    issue_7 = models.SmallIntegerField(null=True, verbose_name="Electric jacket: Bad condition",default=0)
    issue_8 = models.SmallIntegerField(null=True, verbose_name="Electric jacket: Incorrect name printing",default=0)
    issue_9 = models.SmallIntegerField(null=True, verbose_name="Electric jacket: High resistance",default=0)
    issue_10 = models.SmallIntegerField(null=True, verbose_name="Mask: Missing FIE mark",default=0)
    issue_11 = models.SmallIntegerField(null=True, verbose_name="Mask: Bad condition",default=0)
    issue_12 = models.SmallIntegerField(null=True, verbose_name="Mask: Incorrect printing",default=0)
    issue_13 = models.SmallIntegerField(null=True, verbose_name="Mask/overlay: High resistance",default=0)
    issue_14 = models.SmallIntegerField(null=True, verbose_name="Glove: Missing FIE mark",default=0)
    issue_15 = models.SmallIntegerField(null=True, verbose_name="Glove: Bad condition",default=0)
    issue_16 = models.SmallIntegerField(null=True, verbose_name="Glove/Overlay: Resistance",default=0)
    issue_17 = models.SmallIntegerField(null=True, verbose_name="Overlay: Condition",default=0)
    issue_18 = models.SmallIntegerField(null=True, verbose_name="Bodywire: Bad condition",default=0)
    issue_19 = models.SmallIntegerField(null=True, verbose_name="Bodywire: High resistance",default=0)
    issue_20 = models.SmallIntegerField(null=True, verbose_name="Maskwire: Bad condition",default=0)
    issue_21 = models.SmallIntegerField(null=True, verbose_name="Maskwire: High resistance",default=0)
    issue_22 = models.SmallIntegerField(null=True, verbose_name="Weapon: Missing FIE mark",default=0)
    issue_23 = models.SmallIntegerField(null=True, verbose_name="Weapon: Too flexible blade",default=0)
    issue_24 = models.SmallIntegerField(null=True, verbose_name="Weapon: Too sharp blade",default=0)
    issue_25 = models.SmallIntegerField(null=True, verbose_name="Weapon: Blade too curved",default=0)
    issue_26 = models.SmallIntegerField(null=True, verbose_name="Weapon: Blade too long",default=0)
    issue_27 = models.SmallIntegerField(null=True, verbose_name="Weapon: Grip too long",default=0)
    issue_28 = models.SmallIntegerField(null=True, verbose_name="Weapon: Missing screw",default=0)
    issue_29 = models.SmallIntegerField(null=True, verbose_name="Weapon: Point weight",default=0)
    issue_30 = models.SmallIntegerField(null=True, verbose_name="Weapon: Point gauge",default=0)
    issue_31 = models.SmallIntegerField(null=True, verbose_name="Weapon: Bad guard condition",default=0)
    issue_32 = models.SmallIntegerField(null=True, verbose_name="Weapon: Incorrect grip angle",default=0)
    issue_33 = models.SmallIntegerField(null=True, verbose_name="Weapon: Missing insulation",default=0)
    issue_34 = models.SmallIntegerField(null=True, verbose_name="Weapon: Missing pad",default=0)
    issue_35 = models.SmallIntegerField(null=True, verbose_name="Other issue",default=0)
    #end issues

    notes = models.CharField(max_length=1024, default="null", null=True)

class RegistrationModel(models.Model):
    fencers = models.ForeignKey(FencerModel, on_delete=models.CASCADE)
    competitions = models.ForeignKey(CompetitionModel, on_delete=models.CASCADE)
    registered = models.BooleanField()

    def __unicode__(self):
        return '%d: %s' % (self.registered)

class PisteModel(models.Model):
    competitions = models.ForeignKey(CompetitionModel, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=30, choices=PISTE_COLOR_CHOICE)
    is_active = models.BooleanField()

class EquipmentModel(models.Model):
    competitions = models.ForeignKey(CompetitionModel, on_delete=models.CASCADE)
    mask = models.IntegerField()
    underplastron = models.IntegerField()
    chest_protector = models.IntegerField()
    jacket = models.IntegerField()
    electric_jacket = models.IntegerField()
    glove = models.IntegerField()
    breeches = models.IntegerField()
    socks = models.IntegerField()
    weapon = models.IntegerField()
    bodywire = models.IntegerField()
    maskwire = models.IntegerField()

class IndividualFormulaModel(models.Model):
    competitions = models.ForeignKey(CompetitionModel, on_delete=models.CASCADE)
    pool_points = models.IntegerField()
    table_points = models.IntegerField()
    elimination_type = models.CharField(max_length=2, choices=ELIMINATION_TYPE_CHOICE)
    separation_type = models.CharField(max_length=1, choices=SEPARATION_TYPE_CHOICE)
    direct_elimination_type = models.CharField(max_length=1, choices=DIRECT_ELIMINATION_TYPE_CHOICE)
    third_place = models.BooleanField(default=False)
    callroom = models.BooleanField(default=False)
    callroom_number = models.IntegerField(default=16, choices=CALLROOM_NUMBER_CHOICE)