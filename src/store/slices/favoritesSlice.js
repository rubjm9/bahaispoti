import { createSlice } from '@reduxjs/toolkit';

// Cargar favoritos desde localStorage
const loadFavoritesFromStorage = () => {
  try {
    const stored = localStorage.getItem('bahaisongs_favorites');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

const initialState = {
  favorites: loadFavoritesFromStorage()
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const { playlistIndex, songIndex } = action.payload;
      const favoriteId = `${playlistIndex}-${songIndex}`;
      
      // Evitar duplicados
      if (!state.favorites.some(fav => fav.id === favoriteId)) {
        state.favorites.push({
          id: favoriteId,
          playlistIndex,
          songIndex,
          addedAt: new Date().toISOString()
        });
        // Persistir en localStorage
        localStorage.setItem('bahaisongs_favorites', JSON.stringify(state.favorites));
      }
    },
    removeFavorite: (state, action) => {
      const favoriteId = action.payload;
      state.favorites = state.favorites.filter(fav => fav.id !== favoriteId);
      // Actualizar localStorage
      localStorage.setItem('bahaisongs_favorites', JSON.stringify(state.favorites));
    },
    toggleFavorite: (state, action) => {
      const { playlistIndex, songIndex } = action.payload;
      const favoriteId = `${playlistIndex}-${songIndex}`;
      const existingIndex = state.favorites.findIndex(fav => fav.id === favoriteId);
      
      if (existingIndex >= 0) {
        state.favorites.splice(existingIndex, 1);
      } else {
        state.favorites.push({
          id: favoriteId,
          playlistIndex,
          songIndex,
          addedAt: new Date().toISOString()
        });
      }
      // Actualizar localStorage
      localStorage.setItem('bahaisongs_favorites', JSON.stringify(state.favorites));
    },
    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem('bahaisongs_favorites');
    }
  }
});

export const { addFavorite, removeFavorite, toggleFavorite, clearFavorites } = favoritesSlice.actions;

// Selectores
export const selectFavorites = (state) => state.favorites.favorites;
export const selectIsFavorite = (state, playlistIndex, songIndex) => {
  const favoriteId = `${playlistIndex}-${songIndex}`;
  return state.favorites.favorites.some(fav => fav.id === favoriteId);
};

export default favoritesSlice.reducer;
