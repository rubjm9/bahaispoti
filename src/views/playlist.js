import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { changeTrack } from '../store/slices/playerSlice';
import { selectTrackData } from '../store/slices/playerSlice';
import Topnav from '../component/topnav/topnav';
import TextRegularM from "../component/text/text-regular-m";
import PlayButton from '../component/buttons/play-button';
import IconButton from '../component/buttons/icon-button';
import PlaylistDetails from '../component/playlist/playlist-details';
import PlaylistTrack from '../component/playlist/playlist-track';
import * as Icons from '../component/icons';
import { PLAYLIST } from "../data/index";

import styles from './playlist.module.css';
import { useEffect, useState } from 'react';

function PlaylistPage() {
	const dispatch = useDispatch();
	const trackData = useSelector(selectTrackData);
	const[playlistIndex, setPlaylistIndex] = useState(undefined);
	const[isthisplay, setIsthisPlay] = useState(false);
	const params = useParams();
	const path = params?.path;

	function changeBg(color){
		document.documentElement.style.setProperty('--hover-home-bg', color);
	}

	useEffect(() => {
		setIsthisPlay(playlistIndex === trackData.trackKey[0])
	}, [playlistIndex, trackData.trackKey])

	return (
		<div className={styles.PlaylistPage}>
			<div className={styles.gradientBg}></div>
            <div className={styles.gradientBgSoft}></div>
			<div className={styles.Bg}></div>

			<Topnav />

			{PLAYLIST.map((item) => {
                if(item.link === path){
                    return (
                        <div key={item.title} onLoad={() => {
							changeBg(item.playlistBg);
							setPlaylistIndex(PLAYLIST.indexOf(item))
						}}>

							<PlaylistDetails data={item} />

							<div className={styles.PlaylistIcons}>
								<button
									onClick={() => {
										const playlistIdx = PLAYLIST.indexOf(item);
										if (playlistIdx >= 0 && PLAYLIST[playlistIdx]?.playlistData?.length > 0) {
											dispatch(changeTrack([playlistIdx, 0]));
										}
									}} 
								>
									<PlayButton isthisplay={isthisplay}/>
								</button>
								<IconButton icon={<Icons.Like />} activeicon={<Icons.LikeActive />}/>
								<Icons.More className={styles.moreIcon}/>
							</div>

							<div className={styles.ListHead}>
								<TextRegularM>#</TextRegularM>
								<TextRegularM>BAŞLIK</TextRegularM>
								<Icons.Time/>
							</div>

							<div className={styles.PlaylistSongs}>
								{item.playlistData.map((song) => {
									return (
										<button 
											key={song.index} 
											onClick={() => {
												const playlistIdx = PLAYLIST.indexOf(item);
												const songIdx = item.playlistData.indexOf(song);
												if (playlistIdx >= 0 && songIdx >= 0 && PLAYLIST[playlistIdx]?.playlistData?.[songIdx]) {
													dispatch(changeTrack([playlistIdx, songIdx]));
												}
											}} 
											className={styles.SongBtn}
										>
											<PlaylistTrack 
												data={{
													listType: item.type,
													song: song
												}}
											/>
										</button>
									);
								})}
							</div>
                        </div>
                    );
                }
				return null;
			})}
		</div>
	);
}



export default PlaylistPage;