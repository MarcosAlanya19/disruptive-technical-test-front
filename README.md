## Prueba Técnica 
La aplicación se desarrolló con React y TypeScript en el frontend, y el backend está basado en Node.js con Express y MongoDB como base de datos.

<div style="background-color: #f4f4f4; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">  
  <h2 style="font-size: 24px; color: #333;">Despliegue</h2>
  <p style="font-size: 16px; color: #666; margin-bottom: 15px;">
    Puedes ver la aplicación desplegada en el siguiente enlace:
  </p>
  <a href="https://disruptive-technical-test-front.onrender.com/" 
     style="display: inline-block; font-size: 18px; color: #fff; background-color: #007bff; padding: 10px 20px; border-radius: 5px; text-decoration: none; transition: background-color 0.3s;">
    Ir al despliegue
  </a>
</div>

## Objetivo
> El objetivo de este proyecto es permitir que un administrador cree categorías de contenido y temáticas, y que los usuarios con diferentes roles (lectores, creadores, administradores) accedan y gestionen dicho contenido según sus permisos.

## Capturas de Pantalla
- Pantalla de Inicio de Sesión:
![image]  (https://github.com/user-attachments/assets/49ed04bc-4e9b-42ed-96aa-27da0179fbd5)
- Pantalla Principal Después de Iniciar Sesión:
![image](https://github.com/user-attachments/assets/7d230380-799d-46bd-a174-4113244637a1)


## Instalación

```sh
npm install
```

## Inicio
```sh
npm start
```


## Configuración del entorno
Crea un archivo .env en la raíz del proyecto basado en el archivo .env.example. Aquí es donde puedes configurar las variables de entorno necesarias para conectar con el backend y otros servicios.
```
VITE_API_URL=http://localhost:3000/api
```

## Flujo
- Requerimientos
-- Creacion de categorias y tematicas (Para la creacion de contenido)
- Registro de usuario
- Inicio de sesion
- En caso estes modo lector
-- Se logra visualizar las categorias y asimismo informacion del usuario
- En caso este como modo creador
-- Se podra crear contenidos
- En caso no este registrado
-- No se visualizaran las URL

## Funcionalidades
Gestión de Contenidos:
- Vista de contenido disponible por temática.
- Búsqueda de temáticas y nombres de contenido.
- Registro de usuarios como lectores o creadores.
- Validación y ordenación de contenido creado por fecha de creación.

## Tecnologías
- Frontend: React, TypeScript
- Backend: Node.js, Express



👤 **Marcos Alanya**

* Website: https://marcos-alanya-portafolio.vercel.app/
* Github: [@MarcosAlanya19](https://github.com/MarcosAlanya19)
* LinkedIn: [@marcosAlanya19](https://linkedin.com/in/marcosAlanya19)
