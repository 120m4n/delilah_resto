# DelilahResto
**Proyecto Integrador Delilah Restó**

 API Backend en express para un sistema de pedidos online para un restaurante que permite realizar 
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
  *opcional*
  instalar el complemento Thunder Client para Visual Studio Code

## Despliegue
**1) Preparacion de archivos**

* Clonar el repositorio desde github accediendo al link: https://github.com/120m4n/delilah_resto.git

*opcional*
* Descargar un zip file y descomprimir

**2) Instalar dependencias**
```
npm install
```

**3) Migracion de esquema de base de datos**
* Iniciar los modulos MYSQL y Apache desde el panel de XAMPP.
![Alt panel xampp](./Migracion/Panel_XAMPP.PNG?raw=true "Panel XAMPP")
* Abrir XAMPP e iniciar los servicios de **Apache Web Server** y **MySQL Database**
* Abir el navegador a la(http://localhost/phpmyadmin/)**.
* En la pestaña Importar, boton "Seleccionar archivo" buscar la ruta local al archivo "Creacion_Schema.sql". 
El archivo se encuenta en la ruta: **./Migracion/Creacion_Schema.sql**
* Ejecutar la importacion con el boton "Continuar"
![Alt importacion data](./Migracion/Importacion.PNG?raw=true "importacion data")
**Opcional
Ejecutar el archivo "Creacion_Schema.sql" en MySQL Workbench.

* Modelo Entidad-Relacion.
![Alt modelo ER](./Migracion/ER_Diagram.PNG?raw=true "Modelo ER")


**4) Iniciar el servidor**

```
node ./src/app.js

## Documentación de la API

Abrir el archivo **120m4n-delilah-resto-1.0.0-swagger.yaml** y copiarlo en [Swagger](https://editor.swagger.io/) o importar el mismo desde opciones.

Endpoints:

**URL: http://localhost:3000/**

| Metodo | EndPoint              | Descripcion                                             | Rol        |
|--------|-----------------------|---------------------------------------------------------|------------|
| post   | /user/login           | Genera Token jwt de usuario registrado                  | --         |
| post   | /user/registration    | Registro de usuario nuevo                               | --         |
| get    | /user/                | consulta la informacion de todos los usuarios           | admin      |
| get    | /user/{id_user}       | consulta la informacion del usuario por id_user.        | admin/user |
| get    | /product/             | consulta la informacion de todos los productos          | admin/user |
| post   | /product/             | agrega un nuevo producto a la tabla productos           | admin      |
| get    | /product/{id_product} | consulta la informacion de un producto por id_product   | admin/user |
| put    | /product/{id_product} | actualizar la informacion de un producto por id_product | admin      |
| delete | /product/{id_product} | elimina la informacion de un producto                   | admin      |
| get    | /order/               | consulta la informacion de todos los pedidos            | admin      |
| post   | /order/               | agrega una nueva orden a la tabla de ordenes            | admin      |
| get    | /order/{id_user}      | consulta todas las ordenes de un usuario                | admin/user |
| put    | /order/{id_order}     | actualiza el estado de una orden                        | admin      |
| delete | /order/{id_order}     | elimina una orden                                       | admin      |

## CREDENCIALES PARA PRUEBA
# ADMIN
{
    "username":"admin",
    "password":"admin"
}

# USER
{
    "username":"user",
    "password":"user"
}

**5) COLECCION DE POSTMAN CON EJEMPLOS DE PARAMETROS/DATOS DE BODY**
(https://www.getpostman.com/collections/cc94de7fbeb73670a362)
