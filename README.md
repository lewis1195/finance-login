# finance-login
# Sistema de Login para Aplicación de Finanzas 

Este proyecto es un sistema de autenticación (login) diseñado para una aplicación de finanzas. Proporciona funcionalidades de registro, inicio de sesión y cierre de sesión, con un enfoque en la seguridad y la escalabilidad. El sistema está construido con **Node.js**, **Express**, **Passport.js** para autenticación, y **MySQL** como base de datos.

---

## Características Principales

- **Registro de Usuarios**: Los usuarios pueden registrarse proporcionando información personal, como nombre completo, correo electrónico, cuenta de usuario, contraseña, fecha de nacimiento y género.
- **Inicio de Sesión**: Los usuarios pueden iniciar sesión utilizando su cuenta de usuario y contraseña.
- **Cierre de Sesión**: Los usuarios pueden cerrar sesión de manera segura.
- **Dashboard Personalizado**: Después del inicio de sesión, los usuarios son redirigidos a un dashboard que muestra un mensaje de bienvenida.
- **Seguridad**: Las contraseñas se cifran antes de almacenarse en la base de datos, y se utilizan variables de entorno para proteger información sensible.
- **Diseño Responsivo**: Interfaz de usuario básica y responsiva diseñada con CSS.

---

## Tecnologías Utilizadas

- **Backend**:
  - Node.js
  - Express.js
  - Passport.js (para autenticación)
  - MySQL (base de datos)
  - bcryptjs (cifrado de contraseñas)
  - dotenv (gestión de variables de entorno)

- **Frontend**:
  - HTML5
  - CSS3



