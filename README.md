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
- [ ] Добавлена возможность задавать кастомные ссылки, чтобы пользователь мог сделать их человекочитаемыми.
- [ ] Написаны тесты (постарайтесь достичь покрытия в 70% и больше).
- [ ] Если вдруг будет желание, можно слепить простой UI и выложить сервис на бесплатный хостинг - Google Cloud, AWS и подобные.


## Стек технологий
OS: **Ubuntu 20.04**

### Frontend
  * Пока в планах
### Backend
  * [**Node.js**](https://learn.javascript.ru/screencast/nodejs) (>=18)
  * База данных - [**MongoDB**](https://www.mongodb.com/) (через Mongoose)
  * Фреймворк - мой самописный клон express (я воспринял фразу не использовать фреймворке слишком серьезно:))
  * Кэш - Redis (пока нет, в процессе)
  * Тесты - Jest (пока нет, в процессе)

## Команды для запуска сервиса
Старт: 
- ```
  docker-compose up
  ```
  
Остановка: 
- ```
  docker-compose down
  ```

## Эндпоинты
1) Сохранить короткое представление заданного URL
   - ```
       endpoint: localhost:3000/v1/data/shorten
       method: POST
       request: {
              "long_url": "string",
              "custom_url_name": "string" (не реализовано, находится в статусе hold)
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
