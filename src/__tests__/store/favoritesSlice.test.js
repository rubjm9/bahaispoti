import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer, { addFavorite, removeFavorite, toggleFavorite, clearFavorites } from '../../store/slices/favoritesSlice';

describe('favoritesSlice', () => {
  let store;

  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
    store = configureStore({
      reducer: {
        favorites: favoritesReducer
      }
    });
  });

  it('should have initial empty state', () => {
    const state = store.getState().favorites;
    expect(state.favorites).toEqual([]);
  });

  it('should add favorite', () => {
    store.dispatch(addFavorite({ playlistIndex: 0, songIndex: 1 }));
    
    const state = store.getState().favorites;
    expect(state.favorites).toHaveLength(1);
    expect(state.favorites[0].id).toBe('0-1');
  });

  it('should not add duplicate favorites', () => {
    store.dispatch(addFavorite({ playlistIndex: 0, songIndex: 1 }));
    store.dispatch(addFavorite({ playlistIndex: 0, songIndex: 1 }));
    
    const state = store.getState().favorites;
    expect(state.favorites).toHaveLength(1);
  });

  it('should remove favorite', () => {
    store.dispatch(addFavorite({ playlistIndex: 0, songIndex: 1 }));
    store.dispatch(removeFavorite('0-1'));
    
    const state = store.getState().favorites;
    expect(state.favorites).toHaveLength(0);
  });

  it('should toggle favorite', () => {
    store.dispatch(toggleFavorite({ playlistIndex: 0, songIndex: 1 }));
    expect(store.getState().favorites.favorites).toHaveLength(1);

    store.dispatch(toggleFavorite({ playlistIndex: 0, songIndex: 1 }));
    expect(store.getState().favorites.favorites).toHaveLength(0);
  });

  it('should clear all favorites', () => {
    store.dispatch(addFavorite({ playlistIndex: 0, songIndex: 1 }));
    store.dispatch(addFavorite({ playlistIndex: 0, songIndex: 2 }));
    store.dispatch(clearFavorites());
    
    const state = store.getState().favorites;
    expect(state.favorites).toHaveLength(0);
  });
});
