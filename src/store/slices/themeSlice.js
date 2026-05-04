import { createSlice } from '@reduxjs/toolkit';

// Cargar tema desde localStorage o detectar preferencia del sistema
const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem('bahaisongs_theme');
    if (stored) {
      return stored;
    }
    // Detectar preferencia del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  } catch (error) {
    console.error('Error loading theme from localStorage:', error);
    return 'dark';
  }
};

const initialState = {
  theme: getInitialTheme()
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      // Persistir en localStorage
      try {
        localStorage.setItem('bahaisongs_theme', action.payload);
        // Aplicar tema al documento
        document.documentElement.setAttribute('data-theme', action.payload);
      } catch (error) {
        console.error('Error saving theme to localStorage:', error);
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      state.theme = newTheme;
      try {
        localStorage.setItem('bahaisongs_theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      } catch (error) {
        console.error('Error saving theme to localStorage:', error);
      }
    }
  }
});

export const { setTheme, toggleTheme } = themeSlice.actions;

// Selectores
export const selectTheme = (state) => state.theme.theme;
export const selectIsDark = (state) => state.theme.theme === 'dark';
export const selectIsLight = (state) => state.theme.theme === 'light';

export default themeSlice.reducer;
