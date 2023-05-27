from django.contrib import admin
from .models import *

@admin.register(FencerModel)
class FencerAdmin(admin.ModelAdmin):
  pass

@admin.register(TournamentModel)
class TournamentAdmin(admin.ModelAdmin):
  pass

@admin.register(CompetitionModel)
class CompetitionAdmin(admin.ModelAdmin):
  pass

@admin.register(WeaponControlModel)
class WeaponControlAdmin(admin.ModelAdmin):
  pass

@admin.register(RegistrationModel)
class RegistrationAdmin(admin.ModelAdmin):
  pass

@admin.register(PisteModel)
class PisteAdmin(admin.ModelAdmin):
  pass

@admin.register(EquipmentModel)
class EquipmentAdmin(admin.ModelAdmin):
  pass

@admin.register(IndividualFormulaModel)
class IndividualFormulaAdmin(admin.ModelAdmin):
  pass

@admin.register(GivenEquipmentModel)
class GivenEquipmentAdmin(admin.ModelAdmin):
  pass
