<h1> Дипломный проект: реальный кейс от компании «Силант» </h1>

О заказчике и проекте:

Ваш заказчик — Чебоксарский завод силовых агрегатов (ЧЗСА). Этот завод выпускает компоненты к дорожно-строительной 
технике. Например, охлаждающие системы для двигателей тракторов или детали ходовой части. В общем, ЧЗСА — это настоящее 
матёрое производство.
В 2021 году завод начал выпускать свои вилочные погрузчики. Бренд назвали «Силант». Для этого бренда вам и предстоит
выполнять проект.

О сервисе, который нужно реализовать:

Те, кто покупает погрузчики, должны их обслуживать. У всех деталей есть свой срок службы, и их важно вовремя менять. 
Если не заменить деталь вовремя, погрузчик может сломаться и предприятие, которое его использует, 
частично остановится и будет терять деньги.
При этом следить за заменой деталей — непростая задача. Их много, срок у них разный. Можно попросту забыть что-то поменять. 
Поэтому ЧЗСА решили помочь своим клиентам решить эту проблему.
Они решили разработать сервис, в котором можно было бы отслеживать состояние каждой купленной машины и всех её комплектующих. 
Так любой, кто купил погрузчик «Силант» может войти на сайт под своим профилем, и понять, каким машинам в скором времени нужно обслуживание.
Кроме того, сервис решили добавить возможность отслеживать, как идёт обслуживание техники. Так можно понять,
когда очередной погрузчик выйдет из сервиса и вернётся в строй.

Требования к сервису:

Сервис должен хранить следующие данные о складской технике «Силант»:
комплектация погрузчика;
место использования;
истории обслуживания, поломок и ремонта.
В сервисе должна быть реализована авторизация, в том числе различные роли: гость, клиент, сервисная организация и менеджер. 
У каждой роли должен быть настроен свой уровень доступа к просмотру и редактированию данных.

Кто будет пользоваться сервисом
Целевая аудитория сервиса — это все, кто имеют отношение к работе с погрузчиками. А именно:
эксплуатанты техники: те, кто покупают технику;
сервисные организации: те, кто её чинят;
представители производителя техники: те, кто производят технику, то есть сами ЧЗСА.
Для каждого типа пользователей нужно будет реализовать свои функции и свой интерфейс взаимодействия.


<h2>Запуск проекта</h2>

1. Переходим в терминале в директорию проекта.

2. Клонируем проект командой:
```bash
git clone https://github.com/Vvyache/Silant
```
3. Переходим в папку back создаём и активируем виртуальную среду выполнив последовательно команды:
- cd back
- ```bash 
  py -m venv venv
  ```
```bash 
  venv\scripts\activate
  ```

4. Устанавливаем зависимости из файла requirements.txt командой:
```bash
pip install -r requirements.txt
````
5. Создаём секретный ключ и вставляем его в файл backend\App\App\\.env в переменную SECRET_KEY:
```bash
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
````
6. Переходим в терминале в директорию App командой:
cd App

7. Запускаем сервер командой:
```bash
py manage.py runserver
````

8. Открываем второе окно терминала

9. Переходим в директорию front командой
cd front

10. Устанавливаем требуемые зависимости командой:
```bash
npm install
```
11. Запускаем локальный web-сервер командой:
```bash
npm start
```

<h2>Расположение API-документации</h2>

Вся документация расположена по адресам:

http://127.0.0.1:8000/redoc

http://127.0.0.1:8000/swagger

http://127.0.0.1:8000/swagger.json

<h2>Главная страница приложения расположена по адресу:</h2>
http://localhost:3000/


<h2>Логины и пароли для авторизации с различными ролями и в файле users_db.txt:</h2>

<h3>Админ панель Django:</h3>
http://127.0.0.1:8000/admin

admin/admin


<h3>Менеджер:</h3>

manager/zaqwsx123


<h3>Клиент:</h3>

aozander/zaqwsx123

ooofpk21/zaqwsx123

oookomplekt/zaqwsx123

ooomns77/zaqwsx123

oooranskiilph/zaqwsx123

ooormk/zaqwsx123

trudnikov/zaqwsx123


<h3>Сервисная организация:</h3>

ooofns/zaqwsx123

ooopromtech/zaqwsx123

ooosilant/zaqwsx123