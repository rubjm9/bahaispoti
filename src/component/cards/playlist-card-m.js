import React, { useEffect, useState, memo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { changeTrack } from '../../store/slices/playerSlice';
import { selectTrackData, selectIsPlaying } from '../../store/slices/playerSlice';
import Link from "next/link";
import TextBoldL from "../text/text-bold-l";
import TextRegularM from '../text/text-regular-m';
import PlayButton from '../buttons/play-button';

import styles from "./playlist-card-m.module.css";

function PlaylistCardM(props) {
	const dispatch = useDispatch();
	const trackData = useSelector(selectTrackData);
	const isPlaying = useSelector(selectIsPlaying);
	const[isthisplay, setIsthisPlay] = useState(false)

	useEffect(() => {
		setIsthisPlay(parseInt(props.data.index) === trackData.trackKey[0])
	}, [props.data.index, trackData.trackKey])

	return (
		<div className={styles.PlaylistCardSBox}>
			<Link href={`/playlist/${props.data.link}`}>
				<div className={styles.PlaylistCardS}>
					<div className={styles.ImgBox}>
						<img src={props.data.imgUrl} alt={props.data.title} />
					</div>
					<div className={styles.Title}>
						<TextBoldL>{props.data.title}</TextBoldL>
						<TextRegularM>{props.data.artist}</TextRegularM>
					</div>
				</div>
			</Link>
			<div 
				onClick={() => dispatch(changeTrack([parseInt(props.data.index), 0]))} 
				className={`${styles.IconBox} ${isthisplay&&isPlaying ? styles.ActiveIconBox : ''}`}
			>
				<PlayButton isthisplay={isthisplay} />
			</div>
		</div>
	);
}

export default memo(PlaylistCardM);
