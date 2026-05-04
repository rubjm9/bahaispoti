import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectFavorites } from '../store/slices/favoritesSlice';
import { PLAYLIST } from '../data/index';
import TitleM from '../component/text/title-m';
import TextRegularM from '../component/text/text-regular-m';
import PlaylistTrack from '../component/playlist/playlist-track';
import Topnav from '../component/topnav/topnav';
import styles from './favorites.module.css';

function Favorites() {
    const favorites = useSelector(selectFavorites);

    const favoriteSongs = useMemo(() => {
        return favorites
            .map(fav => {
                const playlist = PLAYLIST[fav.playlistIndex];
                if (!playlist) return null;
                const song = playlist.playlistData[fav.songIndex];
                if (!song) return null;
                return {
                    ...fav,
                    song,
                    playlist
                };
            })
            .filter(Boolean);
    }, [favorites]);

    if (favoriteSongs.length === 0) {
        return (
            <div className={styles.container}>
                <Topnav />
                <div className={styles.empty}>
                    <TitleM>Favoritos</TitleM>
                    <TextRegularM>No tienes canciones favoritas aún.</TextRegularM>
                    <TextRegularM>Agrega canciones a favoritos desde cualquier página de canción.</TextRegularM>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Topnav />
            <div className={styles.content}>
                <TitleM>Favoritos</TitleM>
                <div className={styles.list}>
                    {favoriteSongs.map((fav) => (
                        <Link 
                            key={fav.id} 
                            to={`/song/${fav.song.index}`}
                            className={styles.songLink}
                        >
                            <PlaylistTrack 
                                data={{
                                    listType: fav.playlist.type,
                                    song: fav.song
                                }}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Favorites;
