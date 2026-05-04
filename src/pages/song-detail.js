import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeTrack, playPause } from '../store/slices/playerSlice';
import { selectTrackData, selectIsPlaying, selectCurrentTime } from '../store/slices/playerSlice';
import { toggleFavorite, selectIsFavorite } from '../store/slices/favoritesSlice';
import { PLAYLIST } from '../data/index';
import SynchronizedLyrics from '../component/lyrics/SynchronizedLyrics';
import ShareButton from '../component/common/ShareButton';
import styles from './song-detail.module.css';

// Componentes de texto
import TitleL from '../component/text/title-l';
import TitleM from '../component/text/title-m';
import TextBoldM from '../component/text/text-bold-m';
import TextRegularM from '../component/text/text-regular-m';

// Componentes de botones
import PlayButton from '../component/buttons/play-button';
import IconButton from '../component/buttons/icon-button';

// Iconos
import * as Icons from '../component/icons';

function SongDetail() {
    const { songId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const trackData = useSelector(selectTrackData);
    const isPlaying = useSelector(selectIsPlaying);
    const currentTime = useSelector(selectCurrentTime);
    
    const [showFullLyrics, setShowFullLyrics] = useState(false);
    const [useSyncedLyrics, setUseSyncedLyrics] = useState(true);

    // Usar useMemo para optimizar la búsqueda
    const { song, playlist, playlistIndex, songIndex } = useMemo(() => {
        for (let i = 0; i < PLAYLIST.length; i++) {
            const playlistItem = PLAYLIST[i];
            const foundSong = playlistItem.playlistData.find(s => s.index === songId);
            if (foundSong) {
                const songIdx = parseInt(foundSong.index) - 1;
                return {
                    song: foundSong,
                    playlist: playlistItem,
                    playlistIndex: i,
                    songIndex: songIdx
                };
            }
        }
        return { song: null, playlist: null, playlistIndex: -1, songIndex: -1 };
    }, [songId]);

    const isFavorite = useSelector(state => selectIsFavorite(state, playlistIndex, songIndex));

    const handlePlay = () => {
        if (song && playlist && playlistIndex >= 0 && songIndex >= 0) {
            // Validar que la canción existe antes de cambiar
            if (PLAYLIST[playlistIndex]?.playlistData?.[songIndex]) {
                dispatch(changeTrack([playlistIndex, songIndex]));
                dispatch(playPause(true));
            }
        }
    };

    const handlePause = () => {
        dispatch(playPause(false));
    };

    const handleFavorite = () => {
        if (playlistIndex >= 0 && songIndex >= 0) {
            dispatch(toggleFavorite({ playlistIndex, songIndex }));
        }
    };

    const handlePresentationMode = () => {
        navigate(`/presentation/${songId}`);
    };

    if (!song || !playlist) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <TextRegularM>Cargando canción...</TextRegularM>
                </div>
            </div>
        );
    }

    const isCurrentSong = trackData.trackKey && Array.isArray(trackData.trackKey) && 
                         trackData.trackKey[0] === playlistIndex &&
                         trackData.trackKey[1] === songIndex;
    const isCurrentlyPlaying = isCurrentSong && isPlaying;

    // Usar las letras reales de la canción o mostrar mensaje por defecto
    const lyrics = song.lyrics || `Letra no disponible para esta canción.
Esta es una canción bahá'í que forma parte de nuestra colección.
Las letras estarán disponibles próximamente.

Mientras tanto, puedes disfrutar de la música
y reflexionar sobre los principios bahá'ís
de unidad, paz y amor universal.`;

    return (
        <div className={styles.container} role="main" aria-label="Detalles de la canción">
            {/* Header con información de la canción */}
            <header className={styles.header} role="banner">
                <div className={styles.headerContent}>
                    <div className={styles.songInfo}>
                    <div className={styles.songImage}>
                        <img src={song.songimg} alt={`Portada de ${song.songName}`} />
                    </div>
                    <div className={styles.songDetails}>
                        <TextRegularM className={styles.type}>{playlist.type}</TextRegularM>
                        <TitleL className={styles.songTitle}>{song.songName}</TitleL>
                        <TextBoldM className={styles.artist}>{song.songArtist}</TextBoldM>
                        <TextRegularM className={styles.playlist}>De: {playlist.title}</TextRegularM>
                        <TextRegularM className={styles.duration}>Duración: {song.trackTime}</TextRegularM>
                    </div>
                </div>
                
                    <div className={styles.controls}>
                        <PlayButton 
                            onClick={isCurrentlyPlaying ? handlePause : handlePlay}
                            isPlaying={isCurrentlyPlaying}
                            size="large"
                        />
                        <IconButton 
                            icon={isFavorite ? <Icons.LikeActive /> : <Icons.Like />}
                            onClick={handleFavorite}
                            className={styles.likeButton}
                        />
                        <ShareButton 
                            type="song"
                            data={song}
                            className={styles.shareButton}
                        />
                        <IconButton 
                            icon={<Icons.More />}
                            onClick={handlePresentationMode}
                            className={styles.moreButton}
                            title="Modo presentación"
                            aria-label="Abrir modo presentación"
                        />
                    </div>
                </div>
            </header>

            {/* Letra de la canción */}
            <section className={styles.lyricsSection} aria-label="Letra de la canción">
                <div className={styles.lyricsHeader}>
                    <TitleM>Letra</TitleM>
                    <div className={styles.lyricsControls}>
                        {song.syncedLyrics && song.syncedLyrics.length > 0 && (
                            <button 
                                className={styles.toggleMode}
                                onClick={() => setUseSyncedLyrics(!useSyncedLyrics)}
                            >
                                {useSyncedLyrics ? 'Modo estático' : 'Modo sincronizado'}
                            </button>
                        )}
                        <button 
                            className={styles.toggleLyrics}
                            onClick={() => setShowFullLyrics(!showFullLyrics)}
                        >
                            {showFullLyrics ? 'Ver menos' : 'Ver letra completa'}
                        </button>
                    </div>
                </div>
                
                {useSyncedLyrics && song.syncedLyrics && song.syncedLyrics.length > 0 ? (
                    <div className={`${styles.lyrics} ${showFullLyrics ? styles.fullLyrics : styles.previewLyrics}`}>
                        <SynchronizedLyrics
                            syncedLyrics={song.syncedLyrics}
                            currentTime={currentTime}
                            staticLyrics={lyrics}
                            className={styles.syncedLyrics}
                        />
                    </div>
                ) : (
                    <div className={`${styles.lyrics} ${showFullLyrics ? styles.fullLyrics : styles.previewLyrics}`}>
                        <pre className={styles.lyricsText}>{lyrics}</pre>
                    </div>
                )}
            </section>

            {/* Información adicional */}
            <section className={styles.additionalInfo} aria-label="Información adicional">
                <div className={styles.infoSection}>
                    <TitleM>Información de la canción</TitleM>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <TextBoldM>Tipo:</TextBoldM>
                            <TextRegularM>{playlist.type}</TextRegularM>
                        </div>
                        <div className={styles.infoItem}>
                            <TextBoldM>Álbum/Lista:</TextBoldM>
                            <TextRegularM>{playlist.title}</TextRegularM>
                        </div>
                        <div className={styles.infoItem}>
                            <TextBoldM>Duración:</TextBoldM>
                            <TextRegularM>{song.trackTime}</TextRegularM>
                        </div>
                        <div className={styles.infoItem}>
                            <TextBoldM>Artista:</TextBoldM>
                            <TextRegularM>{song.songArtist}</TextRegularM>
                        </div>
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <TitleM>Para reuniones bahá'ís</TitleM>
                    <div className={styles.meetingInfo}>
                        <TextRegularM>
                            Esta canción es ideal para cantar en reuniones bahá'ís. 
                            La letra refleja los principios de unidad, amor y servicio 
                            que son fundamentales en la Fe Bahá'í.
                        </TextRegularM>
                        <div className={styles.meetingTips}>
                            <TextBoldM>Consejos para cantar en grupo:</TextBoldM>
                            <ul>
                                <li><TextRegularM>Practica la melodía antes de la reunión</TextRegularM></li>
                                <li><TextRegularM>Usa esta página como guía de letra</TextRegularM></li>
                                <li><TextRegularM>Invita a otros a participar</TextRegularM></li>
                                <li><TextRegularM>Crea un ambiente de reverencia y alegría</TextRegularM></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SongDetail;
