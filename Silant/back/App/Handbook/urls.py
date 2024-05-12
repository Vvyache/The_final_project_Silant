from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()

router.register(r'modelOfMachine', ModelOfMachineViewSet, basename='modelOfMachine')
router.register(r'modelOfEngine', ModelOfEngineViewSet, basename='modelOfEngine')
router.register(r'modelOfTransmission', ModelOfTransmissionViewSet, basename='modelOfTransmission')
router.register(r'modelOfMainAxle', ModelOfMainAxleViewSet, basename='modelOfMainAxle')
router.register(r'modelOfSteeringAxle', ModelOfSteeringAxleViewSet, basename='modelOfSteeringAxle')
router.register(r'typeOfMaintenance', TypeOfMaintenanceViewSet, basename='typeOfMaintenance')
router.register(r'typeOfFailure', TypeOfFailureViewSet, basename='typeOfFailure')
router.register(r'methodOfRecovery', MethodOfRecoveryViewSet, basename='methodOfRecovery')

app_name = 'Handbook'

urlpatterns = [
    path('', include(router.urls)),
]
