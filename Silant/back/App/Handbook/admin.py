from django.contrib import admin
from .models import *


class CommonModelAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'description']
    prepopulated_fields = {'slug': ('title',)}


@admin.register(TypeOfFailure)
class TypeOfFailureAdmin(CommonModelAdmin):
    pass


@admin.register(MethodOfRecovery)
class MethodOfRecoveryAdmin(CommonModelAdmin):
    pass


@admin.register(TypeOfMaintenance)
class TypeOfMaintenanceAdmin(CommonModelAdmin):
    pass


@admin.register(ModelOfSteeringAxle)
class ModelOfSteeringAxleAdmin(CommonModelAdmin):
    pass


@admin.register(ModelOfMainAxle)
class ModelOfMainAxleAdmin(CommonModelAdmin):
    pass


@admin.register(ModelOfTransmission)
class ModelOfTransmissionAdmin(CommonModelAdmin):
    pass


@admin.register(ModelOfEngine)
class ModelOfEngineAdmin(CommonModelAdmin):
    pass


@admin.register(ModelOfMachine)
class ModelOfMachineAdmin(CommonModelAdmin):
    pass
