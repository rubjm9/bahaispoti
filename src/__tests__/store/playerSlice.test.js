import { configureStore } from '@reduxjs/toolkit';
import playerReducer, { playPause, changeTrack, setCurrentTime, setDuration } from '../../store/slices/playerSlice';
import { PLAYLIST } from '../../data/index';

describe('playerSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        player: playerReducer
      }
    });
  });

  it('should have initial state', () => {
    const state = store.getState().player;
    expect(state.isPlaying).toBe(false);
    expect(state.currentTime).toBe(0);
    expect(state.duration).toBe(0);
    expect(state.trackData.trackKey).toEqual([0, 0]);
  });

  it('should handle playPause', () => {
    store.dispatch(playPause(true));
    expect(store.getState().player.isPlaying).toBe(true);

    store.dispatch(playPause(false));
    expect(store.getState().player.isPlaying).toBe(false);
  });

  it('should handle changeTrack', () => {
    const newTrack = [0, 1];
    store.dispatch(changeTrack(newTrack));
    
    const state = store.getState().player;
    expect(state.trackData.trackKey).toEqual(newTrack);
    expect(state.trackData.trackName).toBe(PLAYLIST[0].playlistData[1].songName);
    expect(state.currentTime).toBe(0); // Should reset time
  });

  it('should handle setCurrentTime', () => {
    store.dispatch(setCurrentTime(30.5));
    expect(store.getState().player.currentTime).toBe(30.5);
  });

  it('should handle setDuration', () => {
    store.dispatch(setDuration(180.0));
    expect(store.getState().player.duration).toBe(180.0);
  });
});
