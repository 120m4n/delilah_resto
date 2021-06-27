# DelilahResto
**Proyecto Integrador Delilah Restó**

 API Backend en express para un sistema de pedidos online para un restaurante que permita realizar 
 operaciones CRUD sobre una estructura de datos
## Requisitos

### Instalar NodeJS
  - [Descargar Nodejs](https://nodejs.org/en/download/)

### Instalar XAMPP
  - [Descargar XAMPP](https://www.apachefriends.org/es/download.html)

### Instalar MySQL Workbench (*opcional)
  - [Descargar Postman](https://www.postman.com/product/api-client/)

### Instalar Postman
  - [Descargar Postman](https://www.postman.com/product/api-client/)

## Despliegue
**1) Preparacion de archivos**

* Clonar el repositorio desde github accediendo al link: 

*opcional*
* Descargar un zip file y descomprimir

**2) Instalar dependencias**
```
npm install
```

**3) Migracion de esquema de base de datos**
* Iniciar los modulos MYSQL y Apache desde el panel de XAMPP.
*----todo incluir imagen
* Abrir XAMPP e iniciar los servicios de **Apache Web Server** y **MySQL Database**
* Abir el navegador a la(http://localhost/phpmyadmin/)**.
* En la pestaña Importar, boton "Seleccionar archivo" buscar la ruta local al archivo "Creacion_Schema.sql". 
El archivo se encuenta en la ruta: **./Migracion/Creacion_Schema.sql**
* Ejecutar la importacion con el boton "Continuar"
*---- todo incluir imagen
**Opcional
Ejecutar el archivo "Creacion_Schema.sql" en MySQL Workbench.


**4) Iniciar el servidor**

```
node ./src/app.js
```

## Documentación de la API

Abrir el archivo **delilahResto_Apispec.yml** y copiarlo en **[Swagger](https://editor.swagger.io/)** o importar el mismo desde opciones.

Endpoints:

**URL: http://localhost:3000/**

| Métod | Endpoints | Descripción | Rol |
| ---- | ---- | ---- | ---- |
| POST | /login | Autenticación e inicio de sesión en el sistema | all |
| POST | /users/register | Crear un nuevo usuario | all |
| GET | /users/all | Obtiene información de todos los usuarios | **admin** |
| GET | /users/{id_user} | Obtiene información de un usuario con su id | **admin** |
| PUT | /users/{id_user} | Modifica la información de un usuario con su id | **admin** |
| GET | /users | Obtiene información del usuario que inició sesión | all |
| PUT | /users | Modifica la información del usuario que inició sesión | all |
| GET | /products | Obtiene información de todos los productos | all |
| GET | /products/{id_product} | Obtiene información de un producto | all |
| PUT | /products/{id_product} | Modifica la información de un producto con su id | **admin** |
| DELETE | /products/{id_product} | Elimina un producto con su id | **admin** |
| POST | /products | Crea un nuevo producto | **admin** |
| GET | /orders/all | Obtiene información de todos los pedidos | **admin** |
| GET | /orders/{id_order} | Obtiene información de un pedido con su id | **admin** |
| PUT | /orders/{id_order} | Modifica el estado de un pedido con su id | **admin** |
| DELETE | /orders/{id_order} | Cancela un pedido con su id | **admin** |
| GET | /orders | Obtiene información de los pedidos del usuario que inició sesión | all |
| POST | /orders | Crea un nuevo pedido el usuario que inició sesión | all |
## Testing
Testear endpoints con postman para usar API y base de datos

## Recursos y tecnologías utilizadas
* NodeJS
* Postman
* XAMPP
* Swagger
* NPM PACKAGES:
  * express
  * nodemon
  * jsonwebtoken
  * express-jwt
  * dotenv
  * mysql2
  * cors
  * compression
  * helmet

## Autor
**Hernán D Belalcázar A** - [Github hernandba](https://github.com/hernandba).
