import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { playPause } from '../../store/slices/playerSlice';
import { selectTrackData, selectIsPlaying } from '../../store/slices/playerSlice';
import TextBoldL from "../text/text-bold-l";
import TextRegularM from "../text/text-regular-m";
import Playgif from '../../image/now-play.gif';
import * as Icons from '../icons';

import styles from "./playlist-track.module.css";

function PlaylistTrack(props) {
    const dispatch = useDispatch();
    const trackData = useSelector(selectTrackData);
    const isPlaying = useSelector(selectIsPlaying);
    const [thisSong, setthisSong] = useState(false);
    
    useEffect(() => {
        if(props.data.song.link === trackData.track && isPlaying === true){
            setthisSong(true)
        }else {
            setthisSong(false)
        }
	}, [props.data.song.link, trackData.track, isPlaying])
    
	return (
		<div 
            className={`${styles.trackDiv} ${thisSong ? "activeTrack" : ""}`}
            style={
                props.data.listType === "álbum" 
                    ? {gridTemplateColumns: '16px 1fr 38px'} 
                    : {}
            }
        >   
            <button
                className={styles.playBtn}
                onClick={() => dispatch(playPause(!isPlaying))}
            >
                {thisSong 
                    ? <Icons.Pause /> 
                    : <Icons.Play />
                }
            </button>

            {thisSong 
                    ? <img className={styles.gif} src={Playgif} /> 
                    : <p className={styles.SongIndex}>{props.data.song.index}</p>
            }

			{props.data.listType === "álbum" ? "" : <img src={props.data.song.songimg} />}

			<span>
				<Link to={`/song/${props.data.song.index}`} className={styles.songLink}>
					<TextBoldL>{props.data.song.songName}</TextBoldL>
					<TextRegularM>{props.data.song.songArtist}</TextRegularM>
				</Link>
			</span>

			<p>{props.data.song.trackTime}</p>
		</div>
	);
}


export default PlaylistTrack;