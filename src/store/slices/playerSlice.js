import { createSlice } from '@reduxjs/toolkit';
import { PLAYLIST } from '../../data/index';

// Función helper para obtener el estado inicial de forma segura
const getInitialTrackData = () => {
  try {
    if (
      PLAYLIST &&
      PLAYLIST.length > 0 &&
      PLAYLIST[0].playlistData &&
      PLAYLIST[0].playlistData.length > 0 &&
      PLAYLIST[0].playlistData[0]
    ) {
      const firstSong = PLAYLIST[0].playlistData[0];
      return {
        trackKey: [0, 0],
        track: firstSong.link || '',
        trackName: firstSong.songName || 'Canción sin nombre',
        trackImg: firstSong.songimg || '',
        trackArtist: firstSong.songArtist || 'Artista desconocido'
      };
    }
  } catch (error) {
    console.error('Error initializing track data:', error);
  }
  
  // Estado por defecto si no hay datos disponibles
  return {
    trackKey: [0, 0],
    track: '',
    trackName: 'No hay canciones disponibles',
    trackImg: '',
    trackArtist: ''
  };
};

const initialState = {
  trackData: getInitialTrackData(),
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  isLoading: false,
  error: null
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },
    changeTrack: (state, action) => {
      const [playlistIndex, songIndex] = action.payload;
      
      // Validar que los índices sean válidos
      if (
        !Array.isArray(action.payload) ||
        playlistIndex === undefined ||
        songIndex === undefined ||
        !PLAYLIST ||
        !PLAYLIST[playlistIndex] ||
        !PLAYLIST[playlistIndex].playlistData ||
        !PLAYLIST[playlistIndex].playlistData[songIndex]
      ) {
        console.error('Invalid track indices:', action.payload);
        state.error = 'Error: Canción no encontrada';
        return;
      }
      
      const playlist = PLAYLIST[playlistIndex];
      const song = playlist.playlistData[songIndex];
      
      if (!song || !song.link) {
        console.error('Invalid song data:', song);
        state.error = 'Error: Datos de canción inválidos';
        return;
      }
      
      state.trackData = {
        trackKey: [playlistIndex, songIndex],
        track: song.link,
        trackName: song.songName || 'Canción sin nombre',
        trackImg: song.songimg || '',
        trackArtist: song.songArtist || 'Artista desconocido'
      };
      // Resetear tiempo cuando cambia la canción
      state.currentTime = 0;
      state.error = null;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { playPause, changeTrack, setCurrentTime, setDuration, setLoading, setError } = playerSlice.actions;

// Selectores
export const selectTrackData = (state) => state.player.trackData;
export const selectIsPlaying = (state) => state.player.isPlaying;
export const selectCurrentTime = (state) => state.player.currentTime;
export const selectDuration = (state) => state.player.duration;
export const selectIsLoading = (state) => state.player.isLoading;
export const selectError = (state) => state.player.error;

export default playerSlice.reducer;
