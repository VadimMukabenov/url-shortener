# url-shortener
# [Репозиторий](https://github.com/VadimMukabenov/url-shortener) 

## Должна быть возможность:
- [:heavy_check_mark:] Сохранить короткое представление заданного URL.
- [:heavy_check_mark:] Перейти по сохраненному ранее короткому представлению и получить redirect на соответствующий исходный URL.
## Требования:
- [:heavy_check_mark:] Язык программирования: Typescript/Javascript/PHP.
- [:heavy_check_mark:] Предоставить инструкцию по запуску приложения. 
- [:heavy_check_mark:] Использовать нативный язык без фреймворков (Node.js + Typescript, PHP). Разрешено пользоваться библиотеками, если есть такая необходимость.
- [:heavy_check_mark:] Код нужно выложить на github.
## Усложнения:
- [:heavy_check_mark:] Добавлена валидация URL с проверкой корректности ссылки.
- [:heavy_check_mark:] Добавлена возможность задавать кастомные ссылки, чтобы пользователь мог сделать их человекочитаемыми.
- ![30%](https://progress-bar.dev/30) Написаны тесты (постарайтесь достичь покрытия в 70% и больше).
- [ ] Если вдруг будет желание, можно слепить простой UI и выложить сервис на бесплатный хостинг - Google Cloud, AWS и подобные.


## Стек технологий
OS: **Ubuntu 20.04**

### Frontend
  * Пока в планах
### Backend
  * [**Node.js**](https://learn.javascript.ru/screencast/nodejs) (>=18)
  * База данных - [**MongoDB**](https://www.mongodb.com/) (через Mongoose). Надо добавить индекс(ы)
  * Фреймворк - мой самописный клон express (я воспринял фразу не использовать фреймворке слишком серьезно:))
  * Кэш - Redis (пока нет, в процессе)
  * Переменные окружения - пока захардкожены в docker-compose. В будущем лучше перенести в Github/Gitlab variables. А также можно создать .env файлик и передавать его через почту или мессенджер
  * Тесты - Jest (пока нет, в процессе)
  * Валидация запросов - Yup, Zod. (пока нет, в процессе)
  * Архитектура -  [**Hexagonal Architecture**](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software))
  * Deploy - есть мысль написать Ansible script и Github Actions для ci/cd (тесты, линтеры) и задеплоить на VPS. Наверняка придется пободаться с сертификатами

### Архитектура

![image](https://github.com/VadimMukabenov/url-shortener/assets/96657105/f678fc20-67b2-41df-994e-8ad3f22aa568)


## Команды для запуска сервиса

На данный момент актуальная ветка это ```dev```.

Старт: 
- ```
  docker-compose up
  ```
  
Остановка: 
- ```
  docker-compose down
  ```

## Эндпоинты
1) Сохранить короткое представление заданного URL. ```custom_url``` - это строка от 1 до 7 символов, является необязательным
   - ```
       endpoint: localhost:3000/v1/data/shorten
       method: POST
       request: {
              "long_url": "string",
              "custom_url": "string"
       }
       response: {
              "short_url": string"
       }
     ```
2) Перейти по сохраненному ранее короткому представлению и получить redirect на соответствующий исходный URL. (проверил в google chrome, все работает)
   - ```
       endpoint: http://localhost:3000/здесь-короткий-адрес (пример: http://localhost:3333/tSSFQNP)
       method: GET
       request: {}
       response: {}
     ```
