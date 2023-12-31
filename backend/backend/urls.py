from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'fencers', views.FencerViewSet)
router.register(r'competitions', views.CompetitionViewSet)
router.register(r'tournaments', views.TournamentViewSet)
router.register(r'weaponcontrols', views.WeaponControlViewSet)
router.register(r'registrations', views.RegistrationViewSet)
router.register(r'pistes', views.PisteViewSet)
router.register(r'equipments', views.EquipmentViewSet)
router.register(r'individualformulas', views.IndividualFormulaViewSet)
router.register(r'givenequipments', views.GivenEquipmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path(
    #     'uploadxml/',
    #     views.XmlUploadView.as_view()
    # ),
    path(
        'tournaments/<int:tournament>/competitions/',
        views.TournamentCompetitionsView.as_view()
    ),
    path(
        'competitions/<int:competition>/fencers/',
        views.CompetitionsFencerView.as_view()
    ),
    path(
        'competitions/<int:competition>/registrations/',
        views.GetRegistrationsForCompetition.as_view()
    ),
    path(
        'stats/fencers/<str:fencer>/',
        views.FencersCompetitionsView.as_view()
    ),
    path(
        'stats/tournaments/<str:nationality>/',
        views.TournamentsFencersByNationality.as_view()
    ),
    path(
        'stats/weaponcontrols/issues/<str:competition>/<str:fencer>/',
        views.WeaponControlFencersIssues.as_view()
    ),
    path(
        'in-register/<str:competition>/<str:fencer>/',
        views.RegisterFencerIn.as_view(),
    ),
    path(
        'un-register/<str:competition>/<str:fencer>/',
        views.RegisterFencerOut.as_view(),
    ),
    path(
        'registration/<str:competition>/',
        views.RegisterFencerList.as_view(),
    ),
    path(
        'gethash/<int:competition>/<str:fencer>/',
        views.GetHash.as_view(),
    ),
    path(
        'customtoken/',
        views.CustomTokenObtainPairView.as_view()
    ),
    path(
        'verifyhash/',
        views.VerifyHash.as_view(),
    ),
    path(
        'competitorsdata/<int:competition>',
        views.AllCompetitorsData.as_view(),
    ),
    path(
        'stats/<int:competition>',
        views.Statistics.as_view(),
    ),
    path(
        'stats/byNation/<int:competition>/',
        views.StatisticsGetByNations.as_view(),
    ),
    path(
        'stats/byNationByIssues/<int:competition>/',
        views.StatisticsGetByNationsByIssue.as_view(),
    ),
    path(
        'stats/byIssues/<int:competition>/',
        views.StatisticsGetByIssues.as_view(),
    ),
]
