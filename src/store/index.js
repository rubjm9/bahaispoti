import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import favoritesReducer from './slices/favoritesSlice';
import historyReducer from './slices/historySlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    favorites: favoritesReducer,
    history: historyReducer,
    theme: themeReducer,
  },
});

// Inicializar tema al cargar
const initializeTheme = () => {
  if (typeof document === 'undefined') return;
  const state = store.getState();
  const theme = state.theme.theme;
  document.documentElement.setAttribute('data-theme', theme);
};

// Suscribirse a cambios de tema (solo en navegador)
store.subscribe(() => {
  if (typeof document === 'undefined') return;
  const state = store.getState();
  const theme = state.theme.theme;
  document.documentElement.setAttribute('data-theme', theme);
});

// Inicializar al cargar
if (typeof window !== 'undefined') {
  initializeTheme();
}
