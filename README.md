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

