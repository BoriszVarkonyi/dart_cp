from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'fencers', views.FencerViewSet)
router.register(r'competitions', views.CompetitionViewSet)
router.register(r'tournaments', views.TournamentViewSet)
router.register(r'weaponcontrols', views.WeaponControlViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('uploadxml/', views.MyUploadView.as_view()),
    path('stats/fencers/<int:fencer>/', views.FencersCompetitionsView.as_view()),
]
