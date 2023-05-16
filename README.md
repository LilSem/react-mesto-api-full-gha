[![Tests](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml/badge.svg)](https://github.com/yandex-praktikum/react-mesto-api-full-gha/actions/workflows/tests.yml)
# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями.

Адрес репозитория: https://github.com/...

## Ссылки на проект

IP 51.250.102.220

Frontend https://lilsem.nomoredomains.monster

Backend https://api.lilsem.nomoredomains.monster

### Список запросов к API

**GET POST** /users  
**GET-запрос возвращает всех пользователей из базы данных.  
POST-запрос создаёт пользователя с переданными в теле запроса name, about, avatar**  

**GET** /users/:userId  
**GET-запрос возвращает пользователя по переданному _id** 

**PATCH** /users/me  
**PATCH-запрос обновляет информацию о пользователе**  
  
**GET** /users/me  
**GET-запрос возвращает информацию о текущем пользователе**  

**PATCH** /users/me/avatar   
**PATCH-запрос обновляет аватар пользователя**  

**GET POST** /cards  
**GET-запрос возвращает все карточки из базы данных.   
POST-запрос создает новую карточку по переданным параметрам**  

**DELETE** /cards/:cardId  
**DELETE-запрос удаляет карточку по _id**  

**PUT DELETE** /cards/:cardId/likes  
**PUT-запрос добавляет лайк карточке. DELETE-запрос удаляет лайк с карточки**  

**POST** /signin  
**POST-запрос выполняет авторизацию по полям email и password**  

**POST** /signup  
**POST-запрос выполняет регистрацию по полям email и password**  