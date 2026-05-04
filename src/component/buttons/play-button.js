import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playPause } from '../../store/slices/playerSlice';
import { selectIsPlaying } from '../../store/slices/playerSlice';
import * as Icons from '../icons';

import styles from './play-button.module.css'

function PlayButton({ isthisplay, onClick }) {
    const dispatch = useDispatch();
    const isPlaying = useSelector(selectIsPlaying);

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            dispatch(playPause(!isPlaying));
        }
    };

    return (
        <button 
            className={styles.playBtn} 
            onClick={handleClick}
            aria-label={isPlaying && isthisplay ? 'Pausar' : 'Reproducir'}
            aria-pressed={isPlaying && isthisplay}
        >
            {isPlaying && isthisplay
                ? <Icons.Pause />
                : <Icons.Play />
            }
        </button>
    );
}

export default PlayButton;