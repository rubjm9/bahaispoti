import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTrack, playPause, setCurrentTime, setDuration } from '../../store/slices/playerSlice';
import { addToHistory } from '../../store/slices/historySlice';
import { selectTrackData, selectIsPlaying } from '../../store/slices/playerSlice';
import useWindowSize from '../../hooks/useWindowSize';
import FooterLeft from './footer-left';
import MusicControlBox from './player/music-control-box';
import MusicProgressBar from './player/music-progress-bar';
import FooterRight from './footer-right';
import Audio from './audio';

import { PLAYLIST } from "../../data/index";
import CONST from '../../constants/index';
import styles from "./footer.module.css";

function Footer(){
    const size = useWindowSize();
    const dispatch = useDispatch();
    const trackData = useSelector(selectTrackData);
    const isPlaying = useSelector(selectIsPlaying);

    const [currentTime, setCurrentTimeLocal] = useState(0);
    const [duration, setDurationLocal] = useState(0);
    const [volume, setVolume] = useState(1);
    const audioRef = useRef(null);

    const handleTrackClick = (position) => {
        if (audioRef.current) {
            audioRef.current.currentTime = position;
        }
    };

    const handleDuration = (duration) => {
        setDurationLocal(duration);
        dispatch(setDuration(duration));
    };

    const handleCurrentTime = (time) => {
        setCurrentTimeLocal(time);
        dispatch(setCurrentTime(time));
    };

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Agregar al historial cuando cambia la canción
    useEffect(() => {
        if (trackData.trackKey && Array.isArray(trackData.trackKey)) {
            dispatch(addToHistory({
                playlistIndex: trackData.trackKey[0],
                songIndex: trackData.trackKey[1]
            }));
        }
    }, [trackData.trackKey, dispatch]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !trackData.trackKey || !Array.isArray(trackData.trackKey)) return;

        const handleEnded = () => {
            const [playlistIndex, songIndex] = trackData.trackKey;
            
            // Validar que los índices sean válidos
            if (
                playlistIndex === undefined ||
                songIndex === undefined ||
                !PLAYLIST ||
                !PLAYLIST[playlistIndex] ||
                !PLAYLIST[playlistIndex].playlistData
            ) {
                console.error('Invalid track data for next song');
                return;
            }
            
            const playlist = PLAYLIST[playlistIndex];
            
            if (songIndex === playlist.playlistData.length - 1) {
                // Ir al inicio de la playlist
                if (playlist.playlistData.length > 0) {
                    dispatch(changeTrack([playlistIndex, 0]));
                }
            } else {
                // Siguiente canción
                dispatch(changeTrack([playlistIndex, songIndex + 1]));
            }
        };

        audio.addEventListener('ended', handleEnded);
        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, [trackData.trackKey, dispatch]);

    return (
        <footer className={styles.footer} role="contentinfo" aria-label="Reproductor de música">
            <div className={styles.nowplayingbar}>
                <FooterLeft />
                <div className={styles.footerMid} role="region" aria-label="Controles de reproducción">
                    <MusicControlBox />
                    <MusicProgressBar 
                        currentTime={currentTime} 
                        duration={duration} 
                        handleTrackClick={handleTrackClick}
                    />
                    <Audio
                        ref={audioRef}
                        handleDuration={handleDuration}
                        handleCurrentTime={handleCurrentTime}
                        trackData={trackData}
                        isPlaying={isPlaying}
                    />
                </div>
                {size.width > CONST.MOBILE_SIZE && 
                    <FooterRight 
                        volume={volume} 
                        setVolume={setVolume}
                    />
                }
            </div>
        </footer>
    );
}

export default Footer;