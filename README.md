# BahaiSongs - Reproductor de música bahá'í

Reproductor web de música bahá'í con Next.js (App Router), React 18 y Redux Toolkit. Incluye letras de canciones para facilitar el canto grupal en reuniones bahá'ís.

## Requisitos previos

- Node.js 18 o superior recomendado
- npm

## Pasos para ejecutar en local

1. Instalar dependencias:

```bash
npm install
```

2. Servidor de desarrollo (Next.js):

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

3. Otro puerto:

```bash
PORT=3001 npm run dev
```

## Scripts

- `npm run dev` — desarrollo (`next dev`)
- `npm run build` — compilación de producción (`next build`)
- `npm start` — sirve el build (`next start`, tras `npm run build`)
- `npm test` — tests con Jest (`jest`)
- `npm run lint` — ESLint (`next lint`)
- `npm run icon` — genera componentes de iconos desde SVG

## Estructura relevante

- `app/` — rutas App Router y layouts (shell con sidebar y reproductor en `app/(main)/layout.tsx`).
- `src/views/` — pantallas de la app (antes `src/pages/`; el nombre `pages` reservaba el Pages Router de Next).
- `src/component/`, `src/store/`, `src/data/`, etc. — lógica y UI compartida.

## Tecnologías

- Next.js 16 (App Router, Turbopack en `next dev` / `next build`)
- TypeScript (configuración en `app/` y `tsconfig.json`; el código en `src/` sigue siendo mayoritariamente JavaScript con `allowJs`)
- React 18
- Redux Toolkit y react-redux
- CSS Modules

La navegación usa `next/link` y `next/navigation` (antes React Router DOM 6).
