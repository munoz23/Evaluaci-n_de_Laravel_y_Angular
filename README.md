# 🚀 Proyecto de Desarrollo de API y Frontend

Este repositorio contiene el código fuente para el desarrollo de una API en Laravel con Sanctum para la autenticación y un frontend que consume dicha API. El proyecto está organizado en dos ramas principales:

- **`back-end`**: Contiene el código fuente de la API desarrollada en Laravel.
- **`front-end`**: Contiene el código fuente del frontend que consume la API.

## 📂 Estructura del Repositorio

- **`back-end`**: Rama dedicada al desarrollo del backend en Laravel.
- **`front-end`**: Rama dedicada al desarrollo del frontend.

## 🛠️ Especificaciones Técnicas del API

El API está desarrollada en **Laravel** utilizando **Sanctum** para la autenticación de usuarios. Las rutas del API están diseñadas para manejar las siguientes operaciones:

### 🔐 Autenticación

- **POST** `http://localhost/api/v1/login`
  - **Descripción**: Inicia sesión y genera un token de autenticación.
  - **Parámetros**:
    - `email` (string): Correo electrónico del usuario.
    - `password` (string): Contraseña del usuario.
  - **Respuesta**: Token de autenticación.

- **POST** `http://localhost/api/v1/logout`
  - **Descripción**: Cierra la sesión del usuario y revoca el token de autenticación.
  - **Headers**:
    - `Authorization`: Bearer `{token}`
  - **Respuesta**: Mensaje de confirmación.

### 🧑‍🎓 Gestión de Alumnos

- **POST** `http://localhost/api/crear-alumno`
  - **Descripción**: Crea un nuevo registro de alumno.
  - **Parámetros**:
    - `nombre` (string): Nombre del alumno.
    - `apellido` (string): Apellido del alumno.
    - `email` (string): Correo electrónico del alumno.
    - `telefono` (string): Número de teléfono del alumno.
  - **Respuesta**: Datos del alumno creado.

- **GET** `http://localhost/api/consultar-alumno/{id}`
  - **Descripción**: Consulta los datos de un alumno específico.
  - **Parámetros**:
    - `id` (int): ID del alumno a consultar.
  - **Respuesta**: Datos del alumno consultado.

## 🐳 Uso de Docker para el Backend

El backend de este proyecto está configurado para ejecutarse en un entorno de **Docker**, lo que facilita la configuración y el despliegue en cualquier sistema. A continuación, se detallan los pasos para levantar el entorno de desarrollo utilizando Docker:

### Requisitos

- **Docker** >= 20.10
- **Docker Compose** >= 1.29

### Configuración y Ejecución

1. Clona el repositorio y cambia a la rama `back-end`:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   git checkout back-end
