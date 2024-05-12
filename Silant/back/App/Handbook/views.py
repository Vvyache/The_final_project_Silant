from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissions
from MainApp.serializers import *
from .serializers import *
from .models import *
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework_simplejwt.views import (
    TokenBlacklistView,
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


class TokenObtainPairResponseSerializer(serializers.Serializer):
    access = serializers.CharField()
    refresh = serializers.CharField()


class DecoratedTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenObtainPairResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class TokenRefreshResponseSerializer(serializers.Serializer):
    access = serializers.CharField()


class DecoratedTokenRefreshView(TokenRefreshView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenRefreshResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class TokenVerifyResponseSerializer(serializers.Serializer):
    pass


class DecoratedTokenVerifyView(TokenVerifyView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenVerifyResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class TokenBlacklistResponseSerializer(serializers.Serializer):
    pass


class DecoratedTokenBlacklistView(TokenBlacklistView):
    @swagger_auto_schema(
        responses={
            status.HTTP_200_OK: TokenBlacklistResponseSerializer,
        }
    )
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)


class BaseViewSet(viewsets.ModelViewSet):
    permission_classes = (DjangoModelPermissions,)

    def get_serializer_class(self):
        serializer_class = self.serializer_class
        if self.action == "list":
            return self.list_serializer_class
        return serializer_class


class ModelViewSetWithListOnly(BaseViewSet):
    http_method_names = ('get', 'list')
    list_serializer_class = None

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer_class = self.get_serializer_class()
            if serializer_class:
                serializer = serializer_class(page, many=True)
                return self.get_paginated_response(serializer.data)

        serializer_class = self.get_serializer_class()
        if serializer_class:
            serializer = serializer_class(queryset, many=True)
            return Response(serializer.data)
        else:
            return Response([])


class ModelOfMachineViewSet(ModelViewSetWithListOnly):
    serializer_class = ModelOfMachineSerializer
    queryset = ModelOfMachine.objects.all()


class ModelOfEngineViewSet(ModelViewSetWithListOnly):
    serializer_class = ModelOfEngineSerializer
    queryset = ModelOfEngine.objects.all()


class ModelOfTransmissionViewSet(ModelViewSetWithListOnly):
    serializer_class = ModelOfTransmissionSerializer
    queryset = ModelOfTransmission.objects.all()


class ModelOfMainAxleViewSet(ModelViewSetWithListOnly):
    serializer_class = ModelOfMainAxleSerializer
    queryset = ModelOfMainAxle.objects.all()


class ModelOfSteeringAxleViewSet(ModelViewSetWithListOnly):
    serializer_class = ModelOfSteeringAxleSerializer
    queryset = ModelOfSteeringAxle.objects.all()


class TypeOfMaintenanceViewSet(ModelViewSetWithListOnly):
    serializer_class = TypeOfMaintenanceSerializer
    queryset = TypeOfMaintenance.objects.all()


class TypeOfFailureViewSet(ModelViewSetWithListOnly):
    serializer_class = TypeOfFailureSerializer
    queryset = TypeOfFailure.objects.all()


class MethodOfRecoveryViewSet(ModelViewSetWithListOnly):
    serializer_class = MethodOfRecoverySerializer
    queryset = MethodOfRecovery.objects.all()
