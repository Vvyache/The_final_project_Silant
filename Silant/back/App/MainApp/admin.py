from django.contrib import admin
from .models import Machine, Maintenance, Complaints


class MaintenanceAdmin(admin.ModelAdmin):
    fields = ['machine', 'typeOfMaintenance', 'dateOfMaintenance', 'operatingTime', 'numberOrderWork', 'dateOrderWork', 'maintenanceServiceCompany', 'serviceCompany']
    list_display = ['machine', 'typeOfMaintenance', 'maintenance_made', 'service_Company', 'numberOrderWork']

    def maintenance_made(self, obj):
        if obj.machine.client == obj.maintenanceServiceCompany:
            return 'Самостоятельно'
        return obj.maintenanceServiceCompany.first_name

    def service_Company(self, obj):
        return obj.serviceCompany.first_name

    maintenance_made.short_description = 'Организация, проводившая ТО'
    service_Company.short_description = 'Сервисная компания'


class MachineAdmin(admin.ModelAdmin):
    list_display = ['factoryNumberOfMachine', 'dateOfShipment', 'supplyContract', 'consumer', 'operationAddress', 'client_name', 'service_company_name']

    @admin.display(description='Клиент')
    def client_name(self, obj):
        return obj.client.first_name

    @admin.display(description='Сервисная компания')
    def service_company_name(self, obj):
        return obj.serviceCompany.first_name


class ComplaintsAdmin(admin.ModelAdmin):
    fields = ['machine', 'dateOfFailure', 'operatingTime', 'nodeOfFailure', 'descriptionOfFailure', 'recoveryMethod', 'usedSpareParts', 'dateOfRecovery', 'serviceCompany']
    list_display = ['machine', 'dateOfFailure', 'operatingTime', 'nodeOfFailure', 'descriptionOfFailure', 'recoveryMethod', 'usedSpareParts', 'downtimeOfMachine', 'dateOfRecovery']


admin.site.register(Machine, MachineAdmin)
admin.site.register(Maintenance, MaintenanceAdmin)
admin.site.register(Complaints, ComplaintsAdmin)
