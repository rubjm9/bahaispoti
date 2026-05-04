# BahaiSongs - Reproductor de Música Bahá'í

Reproductor web de música bahá'í basado en React. Incluye letras de canciones para facilitar el canto grupal en reuniones bahá'ís.

## 🚀 Cómo ejecutar la aplicación en local

### Requisitos previos
- Node.js (versión 16 o superior)
- npm (incluido con Node.js)

### Pasos para ejecutar

1. **Instalar dependencias** (si aún no lo has hecho):
```bash
npm install
```

2. **Iniciar el servidor de desarrollo**:
```bash
npm start
```

La aplicación se abrirá automáticamente en tu navegador en `http://localhost:3000`

### ⚙️ Configuración del puerto

Si el puerto 3000 está ocupado, puedes usar otro puerto:

```bash
PORT=3001 npm start
```

### 📝 Notas importantes

- **Hot Reload**: Los cambios en el código se reflejarán automáticamente en el navegador
- **Puerto por defecto**: 3000 (puede cambiarse con la variable de entorno `PORT`)
- Ya no es necesario usar `NODE_OPTIONS` gracias a la actualización a react-scripts 5.0.1

## 🛠️ Scripts disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Crea una versión optimizada para producción
- `npm test` - Ejecuta los tests
- `npm run icon` - Genera componentes de iconos desde SVG

## 📦 Tecnologías utilizadas

* React 18.2.0
* Redux Toolkit 2.0.1 (gestión de estado)
* React Router DOM 6.21.1 (navegación)
* Fuse.js 7.0.0 (búsqueda difusa)
* CSS Modules (estilos)
* React Scripts 5.0.1

## ✨ Funcionalidades

### Características principales
- 🎵 Reproductor de música con controles completos
- 📝 Letras sincronizadas (cuando están disponibles)
- 🎤 Modo presentación fullscreen para reuniones
- ❤️ Sistema de favoritos
- 📚 Historial de reproducción
- 🔍 Búsqueda avanzada con Fuse.js
- 📱 PWA (Progressive Web App) - Instalable en dispositivos móviles
- ⚡ Lazy loading de componentes para mejor rendimiento
- 🎨 Interfaz moderna y responsive

### Nuevas funcionalidades
- **Letras sincronizadas**: Visualiza las letras que se sincronizan con la música (requiere datos de timestamps)
- **Temas claro/oscuro**: Cambia entre tema claro y oscuro según tu preferencia
- **Compartir canciones**: Comparte canciones y playlists usando Web Share API o copia al portapapeles
- **Accesibilidad mejorada**: ARIA labels, roles semánticos y navegación por teclado
- **Tests unitarios**: Tests para funcionalidades críticas del reproductor
- **Modo presentación**: Vista fullscreen optimizada para mostrar letras en reuniones
- **Favoritos**: Guarda tus canciones favoritas para acceso rápido
- **Historial**: Revisa las últimas 50 canciones que has reproducido
- **Búsqueda mejorada**: Búsqueda difusa en nombres, artistas y letras de canciones