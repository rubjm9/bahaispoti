import { searchSongs, searchPlaylists } from '../../utils/searchUtils';
import { PLAYLIST } from '../../data/index';

// Mock de PLAYLIST para tests
jest.mock('../../data/index', () => ({
  PLAYLIST: [
    {
      index: '0',
      title: 'Test Playlist',
      artist: 'Test Artist',
      playlistData: [
        {
          index: '1',
          songName: 'Test Song',
          songArtist: 'Test Artist',
          lyrics: 'Test lyrics'
        }
      ]
    }
  ]
}));

describe('searchUtils', () => {
  describe('searchSongs', () => {
    it('should return empty array for short queries', () => {
      expect(searchSongs('a')).toEqual([]);
      expect(searchSongs('')).toEqual([]);
    });

    it('should find songs by name', () => {
      const results = searchSongs('Test Song');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].songName).toContain('Test');
    });

    it('should find songs by artist', () => {
      const results = searchSongs('Test Artist');
      expect(results.length).toBeGreaterThan(0);
    });
  });

  describe('searchPlaylists', () => {
    it('should return empty array for short queries', () => {
      expect(searchPlaylists('a')).toEqual([]);
      expect(searchPlaylists('')).toEqual([]);
    });

    it('should find playlists by title', () => {
      const results = searchPlaylists('Test Playlist');
      expect(results.length).toBeGreaterThan(0);
    });
  });
});
