# Workspace - Gestor de Tareas y Productividad

Aplicación web SPA construida con React y Vite para gestionar tareas diarias de un equipo de trabajo. Permite iniciar sesión de forma simulada, crear tareas, editarlas, cambiar su estado, eliminarlas con confirmación y filtrar por estado.

## Stack tecnológico

- React.js + Vite
- React Router DOM
- Hooks nativos: useState, useEffect, useMemo
- Tailwind CSS
- SweetAlert2
- JSON Server como API REST local
- LocalStorage para simulación de sesión

## Funcionalidades

- Login público en `/login`
- Persistencia de sesión en LocalStorage
- Ruta protegida `/tablero`
- Cierre de sesión
- CRUD completo de tareas
- Confirmación antes de eliminar con SweetAlert2
- Filtros por estado: Todas, Pendiente, En Progreso, Completada
- Indicadores de carga y manejo de errores
- Diseño responsive

## Estructura del proyecto

```txt
src/
  components/
  hooks/
  pages/
  routes/
  services/
  utils/
```

## Instalación

```bash
npm install
```

## Variables de entorno

Copia `.env.example` y crea `.env`:

```bash
VITE_API_URL=http://localhost:3001/tasks
```

## Ejecutar API local

En una terminal:

```bash
npm run api
```

## Ejecutar aplicación

En otra terminal:

```bash
npm run dev
```

Abre la URL que entregue Vite, normalmente:

```bash
http://localhost:5173
```

## Scripts disponibles

```bash
npm run dev
npm run api
npm run build
npm run preview
```

## GitFlow sugerido

```bash
git init
git checkout -b develop

git checkout -b feature/login-component
git add .
git commit -m "feat: add login with localStorage"
git checkout develop
git merge feature/login-component

git checkout -b feature/task-crud
git commit -m "feat: implement task CRUD operations"
git checkout develop
git merge feature/task-crud

git checkout -b feature/responsive-ui
git commit -m "style: improve responsive dashboard UI"
git checkout develop
git merge feature/responsive-ui

git checkout -b main
git merge develop
```

## Despliegue

Para desplegar en Vercel o Netlify, configura la variable `VITE_API_URL` apuntando a una API pública, por ejemplo MockAPI o un JSON Server desplegado.
