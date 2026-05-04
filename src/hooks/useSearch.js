import { useState, useMemo } from 'react';
import { searchSongs, searchPlaylists } from '../utils/searchUtils';
import useDebounce from './useDebounce';

/**
 * Hook para búsqueda de canciones y playlists
 * @param {string} query - Término de búsqueda
 * @param {number} debounceDelay - Delay para debounce en ms (default: 300)
 * @returns {Object} Objeto con resultados de búsqueda
 */
function useSearch(query, debounceDelay = 300) {
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, debounceDelay);

  const results = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.trim().length < 2) {
      setIsSearching(false);
      return {
        songs: [],
        playlists: []
      };
    }

    setIsSearching(true);
    const songs = searchSongs(debouncedQuery);
    const playlists = searchPlaylists(debouncedQuery);
    setIsSearching(false);

    return {
      songs,
      playlists
    };
  }, [debouncedQuery]);

  return {
    ...results,
    isSearching,
    hasQuery: !!debouncedQuery && debouncedQuery.trim().length >= 2
  };
}

export default useSearch;
