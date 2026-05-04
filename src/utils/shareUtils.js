/**
 * Utilidades para compartir contenido usando Web Share API
 */

/**
 * Comparte una canción usando Web Share API o fallback
 * @param {Object} songData - Datos de la canción {songName, songArtist, songId}
 * @returns {Promise<boolean>} - true si se compartió exitosamente
 */
export async function shareSong(songData) {
  const { songName, songArtist, songId } = songData;
  const url = `${window.location.origin}/song/${songId}`;
  const text = `Escucha "${songName}" de ${songArtist} en BahaiSongs`;

  // Verificar si Web Share API está disponible
  if (navigator.share) {
    try {
      await navigator.share({
        title: songName,
        text: text,
        url: url
      });
      return true;
    } catch (error) {
      // El usuario canceló o hubo un error
      if (error.name !== 'AbortError') {
        console.error('Error al compartir:', error);
      }
      return false;
    }
  } else {
    // Fallback: copiar al portapapeles
    return copyToClipboard(text, url);
  }
}

/**
 * Comparte una playlist usando Web Share API o fallback
 * @param {Object} playlistData - Datos de la playlist {title, link}
 * @returns {Promise<boolean>} - true si se compartió exitosamente
 */
export async function sharePlaylist(playlistData) {
  const { title, link } = playlistData;
  const url = `${window.location.origin}/playlist/${link}`;
  const text = `Escucha la playlist "${title}" en BahaiSongs`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url
      });
      return true;
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error al compartir:', error);
      }
      return false;
    }
  } else {
    return copyToClipboard(text, url);
  }
}

/**
 * Copia texto y URL al portapapeles (fallback)
 * @param {string} text - Texto a copiar
 * @param {string} url - URL a copiar
 * @returns {Promise<boolean>} - true si se copió exitosamente
 */
async function copyToClipboard(text, url) {
  const fullText = `${text}\n${url}`;
  
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(fullText);
      // Mostrar notificación (puedes personalizar esto)
      showNotification('Enlace copiado al portapapeles');
      return true;
    } else {
      // Fallback para navegadores antiguos
      const textArea = document.createElement('textarea');
      textArea.value = fullText;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Enlace copiado al portapapeles');
        return true;
      } catch (err) {
        document.body.removeChild(textArea);
        console.error('Error al copiar:', err);
        return false;
      }
    }
  } catch (error) {
    console.error('Error al copiar al portapapeles:', error);
    return false;
  }
}

/**
 * Muestra una notificación temporal
 * @param {string} message - Mensaje a mostrar
 */
function showNotification(message) {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--card-background, #181818);
    color: var(--text-white, #fff);
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    font-size: 14px;
    animation: slideUp 0.3s ease;
  `;
  
  // Agregar animación
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(notification);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease reverse';
    setTimeout(() => {
      document.body.removeChild(notification);
      document.head.removeChild(style);
    }, 300);
  }, 3000);
}

/**
 * Verifica si Web Share API está disponible
 * @returns {boolean}
 */
export function isShareSupported() {
  return typeof navigator !== 'undefined' && !!navigator.share;
}
