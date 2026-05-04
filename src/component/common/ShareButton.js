import React from 'react';
import { shareSong, sharePlaylist, isShareSupported } from '../../utils/shareUtils';
import IconButton from '../buttons/icon-button';
import * as Icons from '../icons';
import styles from './ShareButton.module.css';

function ShareButton({ type = 'song', data, className }) {
    const handleShare = async () => {
        if (type === 'song') {
            await shareSong({
                songName: data.songName,
                songArtist: data.songArtist,
                songId: data.index || data.songId
            });
        } else if (type === 'playlist') {
            await sharePlaylist({
                title: data.title,
                link: data.link
            });
        }
    };

    // Si no hay soporte para compartir, no mostrar el botón
    // (aunque el fallback funciona, es mejor UX)
    if (!isShareSupported() && !navigator.clipboard) {
        return null;
    }

    return (
        <IconButton
            icon={<Icons.Share />}
            onClick={handleShare}
            className={`${styles.shareButton} ${className || ''}`}
            aria-label={`Compartir ${type === 'song' ? 'canción' : 'playlist'}`}
            title={`Compartir ${type === 'song' ? 'canción' : 'playlist'}`}
        />
    );
}

export default ShareButton;
