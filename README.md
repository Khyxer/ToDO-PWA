# Todo App con React, Vite y Firebase

<div align="center">
  <img src="./public/assets/logo.svg" alt="ToDo App Icon" width="150" height="170"/>
</div>

Esta aplicación de tareas (Todo) fue construida utilizando React, Vite y Firebase, implementando funcionalidades CRUD completas y autenticación de usuarios.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

![React](https://img.shields.io/badge/React-blue)
![Vite](https://img.shields.io/badge/Vite-brightgreen)
![Firebase](https://img.shields.io/badge/Firebase-yellow)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC)

## 🚀 Características

- Autenticación de usuarios mediante Firebase Auth
- Nomre, Avatar y Banner de usuario personalizados
- Actualización del perfil del usuario
- Creación, lectura, actualización y eliminación de tareas
- Almacenamiento en tiempo real con Firebase Firestore
- Interfaz responsiva y moderna
- Persistencia de datos

## 🛠️ Tecnologías Utilizadas

- React
- Vite
- Firebase
- React Router DOM
- Tailwind CSS
- React Icons
- Gsap

## 📋 Requisitos Previos

- Node.js
- npm o yarn
- Cuenta en Firebase

## ⚙️ Configuración del Proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/Khyxer/ToDO-PWA.git
cd ToDO-PWA
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con tus credenciales de Firebase:

```plaintext
VITE_FIREBASE_API_KEY=tu-api-key
VITE_FIREBASE_AUTH_DOMAIN=tu-auth-domain
VITE_FIREBASE_PROJECT_ID=tu-project-id
VITE_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu-sender-id
VITE_FIREBASE_APP_ID=tu-app-id
```

## ⚙️ Configuración de Firebase

1. Dirigete a [Firebase Console](https://console.firebase.google.com/).
2. Activa Firebase Authentication y Firestore.
3. Configura las reglas de seguridad de Firestore de la siguiente manera:

   ```json
   rules_version = '2';
   service cloud.firestore {
   match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /tasks/{taskId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
   }
   }
   ```

## 🚀 Iniciar la Aplicación

Para desarrollo:

```bash
npm run dev
```

Para producción:

```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
ToDO-PWA/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Home/
│   │   └── Others/
│   ├── context/
│   ├── firebase/
│   ├── hooks/
│   └── pages/
├── public/
└── package.json
```

## 🔍 Funcionalidades Principales

### Autenticación

- Registro de usuarios
- Inicio de sesión
- Cierre de sesión
- Actualizacón de perfil de usuario

### Gestión de Tareas

- Crear nuevas tareas
- Marcar tareas como completadas
- Editar tareas existentes
- Eliminar tareas
- Filtrar tareas por estado

## 🔐 Seguridad

- Autenticación segura mediante Firebase Auth
- Reglas de seguridad en Firestore para proteger los datos
- Validación de formularios
- Manejo seguro de sesiones

## 📱 Responsive Design

La aplicación está diseñada para funcionar en:

- Dispositivos móviles
- Tablets
- Escritorio

## ❗ Solución de Problemas Comunes

### Error de Autenticación

- Verifica que las credenciales de Firebase sean correctas
- Verifica que el archivo .env este correctamente configurado
- Asegúrate de que la autenticación esté habilitada en Firebase Console

### Problemas con Firestore

- Revisa las reglas de seguridad
- Verifica la conexión a internet

## 🤝 Contribuir

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 👨‍💻 Autor

Khyxer - [@Khyxer\_](https://x.com/Khyxer_)
