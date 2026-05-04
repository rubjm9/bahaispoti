import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setLoading, setError } from '../../store/slices/playerSlice';

const Audio = forwardRef(({ trackData, handleDuration, handleCurrentTime, isPlaying }, ref) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const audio = ref.current;
        if (!audio) return;

        const handleLoadStart = () => {
            dispatch(setLoading(true));
            dispatch(setError(null));
        };

        const handleCanPlay = () => {
            dispatch(setLoading(false));
        };

        const handleError = (e) => {
            dispatch(setLoading(false));
            const error = audio.error;
            let errorMessage = 'Error al cargar el audio';
            
            if (error) {
                switch (error.code) {
                    case error.MEDIA_ERR_ABORTED:
                        errorMessage = 'Reproducción abortada';
                        break;
                    case error.MEDIA_ERR_NETWORK:
                        errorMessage = 'Error de red al cargar el audio';
                        break;
                    case error.MEDIA_ERR_DECODE:
                        errorMessage = 'Error al decodificar el audio';
                        break;
                    case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        errorMessage = 'Formato de audio no soportado';
                        break;
                    default:
                        errorMessage = 'Error desconocido al cargar el audio';
                }
            }
            
            dispatch(setError(errorMessage));
            console.error('Audio error:', errorMessage, error);
        };

        const handleWaiting = () => {
            dispatch(setLoading(true));
        };

        const handlePlaying = () => {
            dispatch(setLoading(false));
        };

        // Preload para mejorar la experiencia
        audio.preload = 'metadata';

        audio.addEventListener('loadstart', handleLoadStart);
        audio.addEventListener('canplay', handleCanPlay);
        audio.addEventListener('error', handleError);
        audio.addEventListener('waiting', handleWaiting);
        audio.addEventListener('playing', handlePlaying);

        return () => {
            audio.removeEventListener('loadstart', handleLoadStart);
            audio.removeEventListener('canplay', handleCanPlay);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('waiting', handleWaiting);
            audio.removeEventListener('playing', handlePlaying);
        };
    }, [dispatch, trackData.track]);

    return (
      <audio
        ref={ref}
        onLoadedMetadata={(e) => handleDuration(e.target.duration)}
        onTimeUpdate={(e) => handleCurrentTime(e.target.currentTime)}
        src={trackData.track}
        autoPlay={isPlaying}
        preload="metadata"
      />
    );
  },
);

Audio.displayName = 'Audio';

Audio.propTypes = {
    handleDuration: PropTypes.func.isRequired,
    handleCurrentTime: PropTypes.func.isRequired,
    trackData: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool.isRequired,
};

export default Audio;