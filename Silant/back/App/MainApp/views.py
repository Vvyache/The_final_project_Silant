from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly, DjangoModelPermissions

from .serializers import MachineSerializer, MaintenanceSerializer, ComplaintsSerializer, DetailedMachineSerializer
from .models import Machine, Maintenance, Complaints, User
from Handbook.models import ModelOfMachine, ModelOfEngine, ModelOfTransmission, ModelOfMainAxle, ModelOfSteeringAxle, \
    TypeOfMaintenance, TypeOfFailure, MethodOfRecovery
from django.db.models import Q
import json
from datetime import datetime


class MachineViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissionsOrAnonReadOnly,)
    serializer_class = MachineSerializer
    http_method_names = ('get', 'post')

    def create(self, request, *args, **kwargs):
        if request.method == 'POST':
            data = json.loads(self.request.data['body'])

            try:
                new_machine = {
                    'factoryNumberOfMachine': data['factoryNumberOfMachine'],
                    'modelOfMachine': ModelOfMachine.objects.get(title=data['modelOfMachine']['title']),
                    'modelOfEngine': ModelOfEngine.objects.get(title=data['modelOfEngine']['title']),
                    'factoryNumberOfEngine': data['factoryNumberOfEngine'],
                    'modelOfTransmission': ModelOfTransmission.objects.get(title=data['modelOfTransmission']['title']),
                    'factoryNumberOfTransmission': data['factoryNumberOfTransmission'],
                    'modelOfMainAxle': ModelOfMainAxle.objects.get(title=data['modelOfMainAxle']['title']),
                    'factoryNumberOfMainAxle': data['factoryNumberOfMainAxle'],
                    'modelOfSteeringAxle': ModelOfSteeringAxle.objects.get(title=data['modelOfSteeringAxle']['title']),
                    'factoryNumberOfSteeringAxle': data['factoryNumberOfSteeringAxle'],
                    'supplyContract': data['supplyContract'],
                    'dateOfShipment': data['dateOfShipment'],
                    'consumer': data['consumer'],
                    'additionalOptions': data['additionalOptions'],
                    'operationAddress': data['operationAddress'],
                    'client': User.objects.get(first_name=data['client']['first_name']),
                    'serviceCompany': User.objects.get(first_name=data['serviceCompany']['first_name']),
                }
                Machine.objects.create(**new_machine)
                res = {'created': True}
                return Response(res, status=status.HTTP_200_OK)
            except KeyError as e:
                return Response({'error': f'Missing required key: {e}'}, status=status.HTTP_400_BAD_REQUEST)
            except (ModelOfMachine.DoesNotExist, ModelOfEngine.DoesNotExist, ModelOfTransmission.DoesNotExist,
                    ModelOfMainAxle.DoesNotExist, ModelOfSteeringAxle.DoesNotExist, User.DoesNotExist) as e:
                return Response({'error': f'Invalid data provided for related models: {e}'},
                                status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return Machine.objects.all()
        elif user.users.role == 'CR':
            return Machine.objects.filter(client=user)
        elif user.users.role == 'SC':
            return Machine.objects.filter(serviceCompany=user)
        else:
            return Machine.objects.all()


class MaintenanceViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    serializer_class = MaintenanceSerializer
    http_method_names = ('get', 'post')

    def create(self, request, *args, **kwargs):
        if self.request.method == 'POST':
            data = self.request.data
            try:
                serviceCompany = Machine.objects.get(factoryNumberOfMachine=data['modelOfMachine'])
                if data['serviceCompany'] == "Самостоятельно":
                    maintenanceServiceCompany = serviceCompany.client
                else:
                    maintenanceServiceCompany = data['serviceCompany']

                newMaintenance = {
                    'machine': Machine.objects.get(factoryNumberOfMachine=data['modelOfMachine']),
                    'typeOfMaintenance': TypeOfMaintenance.objects.get(title=data['typeOfMaintenance']),
                    'dateOfMaintenance': data['dateOfMaintenance'],
                    'operatingTime': data['operatingTime'],
                    'dateOrderWork': data['dateOrderWork'],
                    'numberOrderWork': data['numberOrderWork'],
                    'maintenanceServiceCompany': User.objects.get(username=maintenanceServiceCompany),
                    'serviceCompany': User.objects.get(username=serviceCompany.serviceCompany)
                }
                Maintenance.objects.create(**newMaintenance)
                res = {'created': True}
                return Response(res, status=status.HTTP_200_OK)
            except KeyError as e:
                return Response({'error': f'Missing required key: {e}'}, status=status.HTTP_400_BAD_REQUEST)
            except (Machine.DoesNotExist, TypeOfMaintenance.DoesNotExist, User.DoesNotExist) as e:
                return Response({'error': f'Invalid data provided for related models: {e}'},
                                status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return ''
        elif user.is_superuser or user.users.role == 'MR':
            return Maintenance.objects.all()
        elif user.users.role == 'CR':
            machine = Machine.objects.filter(client=user)
            return Maintenance.objects.filter(machine__in=machine)
        elif user.users.role == 'SC':
            return Maintenance.objects.filter(Q(serviceCompany=user) | Q(maintenanceServiceCompany=user))
        else:
            return ''


class ComplaintsViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    serializer_class = ComplaintsSerializer
    http_method_names = ('get', 'post')

    def create(self, request, *args, **kwargs):
        if self.request.method == 'POST':
            data = self.request.data
            try:
                newComplaints = {
                    'machine': Machine.objects.get(factoryNumberOfMachine=data['machine']),
                    'dateOfFailure': datetime.strptime(data['dateOfFailure'], '%Y-%m-%d').date(),
                    'operatingTime': data['operatingTime'],
                    'nodeOfFailure': TypeOfFailure.objects.get(title=data['nodeOfFailure']),
                    'descriptionOfFailure': data['descriptionOfFailure'],
                    'recoveryMethod': MethodOfRecovery.objects.get(title=data['recoveryMethod']),
                    'usedSpareParts': data['usedSpareParts'],
                    'dateOfRecovery': datetime.strptime(data['dateOfRecovery'], '%Y-%m-%d').date(),
                    'serviceCompany': User.objects.get(first_name=data['serviceCompany'])
                }
                Complaints.objects.create(**newComplaints)
                return Response({'message': 'Запись добавлена'}, status=status.HTTP_201_CREATED)
            except KeyError as e:
                return Response({'error': f'Missing required key: {e}'}, status=status.HTTP_400_BAD_REQUEST)
            except (
            Machine.DoesNotExist, TypeOfFailure.DoesNotExist, MethodOfRecovery.DoesNotExist, User.DoesNotExist) as e:
                return Response({'error': f'Invalid data provided for related models: {e}'},
                                status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous:
            return ''
        elif user.is_superuser or user.users.role == 'MR':
            return Complaints.objects.all()
        elif user.users.role == 'CR':
            machine = Machine.objects.filter(client=user)
            return Complaints.objects.filter(machine__in=machine)
        elif user.users.role == 'SC':
            maintenanceOfMachines = Maintenance.objects.filter(
                Q(serviceCompany=user) | Q(maintenanceServiceCompany=user)).values_list('machine_id', flat=True)
            machines = Machine.objects.filter(factoryNumberOfMachine__in=maintenanceOfMachines)
            return Complaints.objects.filter(machine__in=machines)
        else:
            return ''


class DetailMaintenance(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)
    http_method_names = ['get']
    queryset = Machine.objects.all()
    serializer_class = DetailedMachineSerializer
