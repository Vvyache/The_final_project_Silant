from django.db import models


class BaseModel(models.Model):
    title = models.CharField(max_length=128, verbose_name='Название')
    slug = models.SlugField(max_length=128, verbose_name='Slug', blank=True)
    description = models.TextField(verbose_name='Описание')

    class Meta:
        abstract = True

    def __str__(self):
        return self.title


class ModelOfMachine(BaseModel):
    class Meta:
        verbose_name = 'Модель машины'
        verbose_name_plural = 'Модели машин'


class ModelOfEngine(BaseModel):
    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модели двигателей'


class ModelOfTransmission(BaseModel):
    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модели трансмиссий'


class ModelOfMainAxle(BaseModel):
    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Модели ведущих мостов'


class ModelOfSteeringAxle(BaseModel):
    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Модели управляемых мостов'


class TypeOfMaintenance(BaseModel):
    class Meta:
        verbose_name = 'Вид ТО'
        verbose_name_plural = 'Виды ТО'


class TypeOfFailure(BaseModel):
    class Meta:
        verbose_name = 'Причина отказа'
        verbose_name_plural = 'Причины отказов'


class MethodOfRecovery(BaseModel):
    class Meta:
        verbose_name = 'Способ восстановления'
        verbose_name_plural = 'Способы восстановления'
