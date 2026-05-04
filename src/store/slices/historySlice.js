import { createSlice } from '@reduxjs/toolkit';

// Cargar historial desde localStorage
const loadHistoryFromStorage = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const stored = localStorage.getItem('bahaisongs_history');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading history from localStorage:', error);
    return [];
  }
};

const MAX_HISTORY_ITEMS = 50;

const initialState = {
  history: loadHistoryFromStorage()
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      const { playlistIndex, songIndex } = action.payload;
      const historyId = `${playlistIndex}-${songIndex}`;
      
      // Remover si ya existe (para moverlo al final)
      state.history = state.history.filter(item => item.id !== historyId);
      
      // Agregar al inicio
      state.history.unshift({
        id: historyId,
        playlistIndex,
        songIndex,
        playedAt: new Date().toISOString()
      });
      
      // Limitar a MAX_HISTORY_ITEMS
      if (state.history.length > MAX_HISTORY_ITEMS) {
        state.history = state.history.slice(0, MAX_HISTORY_ITEMS);
      }
      
      // Persistir en localStorage
      localStorage.setItem('bahaisongs_history', JSON.stringify(state.history));
    },
    clearHistory: (state) => {
      state.history = [];
      localStorage.removeItem('bahaisongs_history');
    },
    removeFromHistory: (state, action) => {
      const historyId = action.payload;
      state.history = state.history.filter(item => item.id !== historyId);
      localStorage.setItem('bahaisongs_history', JSON.stringify(state.history));
    }
  }
});

export const { addToHistory, clearHistory, removeFromHistory } = historySlice.actions;

// Selectores
export const selectHistory = (state) => state.history.history;

export default historySlice.reducer;
