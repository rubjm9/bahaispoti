import { useSelector, useDispatch } from 'react-redux';
import { changeTrack } from '../../../store/slices/playerSlice';
import { selectTrackData } from '../../../store/slices/playerSlice';
import * as Icons from '../../icons';
import IconButton from '../../buttons/icon-button';
import PlayButton from '../../buttons/play-button';

import { PLAYLIST } from "../../../data/index";
import styles from "./music-control-box.module.css";

function MusicControlBox(){
    const dispatch = useDispatch();
    const trackData = useSelector(selectTrackData);

    function decreaseIndex(){
        const [playlistIndex, songIndex] = trackData.trackKey || [0, 0];
        
        // Validar que exista la playlist y la canción
        if (
            playlistIndex === undefined ||
            songIndex === undefined ||
            !PLAYLIST ||
            !PLAYLIST[playlistIndex] ||
            !PLAYLIST[playlistIndex].playlistData
        ) {
            return;
        }
        
        if (songIndex > 0) {
            dispatch(changeTrack([playlistIndex, songIndex - 1]));
        }
    }
    
    function increaseIndex(){
        const [playlistIndex, songIndex] = trackData.trackKey || [0, 0];
        
        // Validar que exista la playlist
        if (
            playlistIndex === undefined ||
            songIndex === undefined ||
            !PLAYLIST ||
            !PLAYLIST[playlistIndex] ||
            !PLAYLIST[playlistIndex].playlistData
        ) {
            return;
        }
        
        const playlist = PLAYLIST[playlistIndex];
        if (songIndex < playlist.playlistData.length - 1) {
            dispatch(changeTrack([playlistIndex, songIndex + 1]));
        }
    }

    return (
        <div className={styles.musicControl}>
            <IconButton icon={<Icons.Mix />} activeicon={<Icons.Mix />}/>
            <button className={styles.button} onClick={decreaseIndex}>
                <Icons.Prev />
            </button>
            <PlayButton isthisplay={true}/>
            <button className={styles.button} onClick={increaseIndex}>
                <Icons.Next />
            </button>
            <IconButton icon={<Icons.Loop />} activeicon={<Icons.Loop />}/>
        </div>
    );
}
  
export default MusicControlBox;