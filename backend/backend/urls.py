from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'fencers', views.FencerViewSet)
router.register(r'competitions', views.CompetitionViewSet)
router.register(r'tournaments', views.TournamentViewSet)
router.register(r'weaponcontrol', views.WeaponControlViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
