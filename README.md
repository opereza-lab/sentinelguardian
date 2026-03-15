# SentinelGuardian

App de supervivencia y emergencias migrada desde Base44 a entorno independiente.

## Desarrollo local

1. Instalar dependencias: `npm install`
2. Crear archivo `.env.local`:
```
VITE_BASE44_APP_ID=69ade0b5e824964a1f802ea8
```
3. Ejecutar: `npm run dev`

## Deploy en Vercel

1. Subir el repositorio a GitHub
2. Conectar el repo en Vercel
3. Vercel publica automáticamente con cada push

## Stack

- React 18 + Vite
- Tailwind CSS + shadcn/ui
- React Router DOM v6
- @tanstack/react-query
- react-leaflet (mapa RescueDashboard)
- Almacenamiento local (localStorage) en lugar de Base44
