import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeTrack, playPause } from '../store/slices/playerSlice';
import { selectTrackData, selectIsPlaying, selectCurrentTime } from '../store/slices/playerSlice';
import { PLAYLIST } from '../data/index';
import SynchronizedLyrics from '../component/lyrics/SynchronizedLyrics';
import * as Icons from '../component/icons';
import styles from './presentation-mode.module.css';

function PresentationMode() {
    const { songId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const trackData = useSelector(selectTrackData);
    const isPlaying = useSelector(selectIsPlaying);
    const currentTime = useSelector(selectCurrentTime);
    
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [controlsTimeout, setControlsTimeout] = useState(null);

    // Buscar la canción
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

    // Entrar en fullscreen al cargar
    useEffect(() => {
        const enterFullscreen = async () => {
            try {
                if (document.documentElement.requestFullscreen) {
                    await document.documentElement.requestFullscreen();
                    setIsFullscreen(true);
                }
            } catch (error) {
                console.error('Error entering fullscreen:', error);
            }
        };
        enterFullscreen();

        // Salir de fullscreen al desmontar
        return () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        };
    }, []);

    // Detectar cambios en fullscreen
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, []);

    // Ocultar controles después de 3 segundos de inactividad
    useEffect(() => {
        const resetControlsTimeout = () => {
            setShowControls(true);
            if (controlsTimeout) {
                clearTimeout(controlsTimeout);
            }
            const timeout = setTimeout(() => {
                setShowControls(false);
            }, 3000);
            setControlsTimeout(timeout);
        };

        resetControlsTimeout();

        const handleMouseMove = () => {
            resetControlsTimeout();
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (controlsTimeout) {
                clearTimeout(controlsTimeout);
            }
        };
    }, [controlsTimeout]);

    const handlePlayPause = () => {
        if (song && playlist && playlistIndex >= 0 && songIndex >= 0) {
            if (PLAYLIST[playlistIndex]?.playlistData?.[songIndex]) {
                dispatch(changeTrack([playlistIndex, songIndex]));
                dispatch(playPause(!isPlaying));
            }
        }
    };

    const handlePrevious = () => {
        if (playlistIndex >= 0 && songIndex > 0) {
            if (PLAYLIST[playlistIndex]?.playlistData?.[songIndex - 1]) {
                dispatch(changeTrack([playlistIndex, songIndex - 1]));
            }
        }
    };

    const handleNext = () => {
        if (playlistIndex >= 0 && PLAYLIST[playlistIndex]?.playlistData) {
            const playlist = PLAYLIST[playlistIndex];
            if (songIndex < playlist.playlistData.length - 1) {
                if (playlist.playlistData[songIndex + 1]) {
                    dispatch(changeTrack([playlistIndex, songIndex + 1]));
                }
            }
        }
    };

    const handleExit = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        navigate(-1);
    };

    if (!song || !playlist) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Cargando canción...</div>
            </div>
        );
    }

    const lyrics = song.lyrics || 'Letras no disponibles';

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.songInfo}>
                    <h2 className={styles.songTitle}>{song.songName}</h2>
                    <p className={styles.songArtist}>{song.songArtist}</p>
                </div>

                <div className={styles.lyricsContainer}>
                    {song.syncedLyrics && song.syncedLyrics.length > 0 ? (
                        <SynchronizedLyrics
                            syncedLyrics={song.syncedLyrics}
                            currentTime={currentTime}
                            staticLyrics={lyrics}
                            className={`${styles.syncedLyrics} presentation`}
                        />
                    ) : (
                        <div className={styles.staticLyrics}>
                            <pre className={styles.lyricsText}>{lyrics}</pre>
                        </div>
                    )}
                </div>
            </div>

            {showControls && (
                <div className={styles.controls}>
                    <button 
                        className={styles.controlButton}
                        onClick={handlePrevious}
                        disabled={songIndex === 0}
                    >
                        <Icons.Prev />
                    </button>
                    <button 
                        className={styles.controlButton}
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? <Icons.Pause /> : <Icons.Play />}
                    </button>
                    <button 
                        className={styles.controlButton}
                        onClick={handleNext}
                        disabled={songIndex === PLAYLIST[playlistIndex].playlistData.length - 1}
                    >
                        <Icons.Next />
                    </button>
                    <button 
                        className={styles.controlButton}
                        onClick={handleExit}
                    >
                        Salir
                    </button>
                </div>
            )}
        </div>
    );
}

export default PresentationMode;
