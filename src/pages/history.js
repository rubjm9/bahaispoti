import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectHistory } from '../store/slices/historySlice';
import { PLAYLIST } from '../data/index';
import TitleM from '../component/text/title-m';
import TextRegularM from '../component/text/text-regular-m';
import PlaylistTrack from '../component/playlist/playlist-track';
import Topnav from '../component/topnav/topnav';
import styles from './history.module.css';

function History() {
    const history = useSelector(selectHistory);

    const historySongs = useMemo(() => {
        return history
            .map(item => {
                const playlist = PLAYLIST[item.playlistIndex];
                if (!playlist) return null;
                const song = playlist.playlistData[item.songIndex];
                if (!song) return null;
                return {
                    ...item,
                    song,
                    playlist
                };
            })
            .filter(Boolean);
    }, [history]);

    if (historySongs.length === 0) {
        return (
            <div className={styles.container}>
                <Topnav />
                <div className={styles.empty}>
                    <TitleM>Historial</TitleM>
                    <TextRegularM>No has reproducido ninguna canción aún.</TextRegularM>
                    <TextRegularM>Las canciones que reproduzcas aparecerán aquí.</TextRegularM>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Topnav />
            <div className={styles.content}>
                <TitleM>Historial de reproducción</TitleM>
                <div className={styles.list}>
                    {historySongs.map((item) => (
                        <Link 
                            key={item.id} 
                            to={`/song/${item.song.index}`}
                            className={styles.songLink}
                        >
                            <PlaylistTrack 
                                data={{
                                    listType: item.playlist.type,
                                    song: item.song
                                }}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default History;
