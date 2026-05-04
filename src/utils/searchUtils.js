import Fuse from 'fuse.js';
import { PLAYLIST } from '../data/index';

/**
 * Configuración de Fuse.js para búsqueda de canciones
 */
const fuseOptions = {
  keys: [
    { name: 'songName', weight: 0.7 },
    { name: 'songArtist', weight: 0.3 },
    { name: 'lyrics', weight: 0.1 }
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2
};

/**
 * Prepara los datos para la búsqueda
 */
function prepareSearchData() {
  const searchData = [];
  
  PLAYLIST.forEach((playlist, playlistIndex) => {
    playlist.playlistData.forEach((song, songIndex) => {
      searchData.push({
        ...song,
        playlistIndex,
        songIndex,
        playlistTitle: playlist.title,
        playlistType: playlist.type
      });
    });
  });
  
  return searchData;
}

/**
 * Busca canciones usando Fuse.js
 * @param {string} query - Término de búsqueda
 * @returns {Array} Resultados de la búsqueda
 */
export function searchSongs(query) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchData = prepareSearchData();
  const fuse = new Fuse(searchData, fuseOptions);
  const results = fuse.search(query.trim());
  
  return results.map(result => ({
    ...result.item,
    score: result.score
  }));
}

/**
 * Busca playlists
 * @param {string} query - Término de búsqueda
 * @returns {Array} Resultados de la búsqueda
 */
export function searchPlaylists(query) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const fuse = new Fuse(PLAYLIST, {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'artist', weight: 0.3 }
    ],
    threshold: 0.3,
    includeScore: true
  });

  const results = fuse.search(query.trim());
  return results.map(result => ({
    ...result.item,
    score: result.score
  }));
}
