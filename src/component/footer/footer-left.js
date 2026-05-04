import { useSelector } from "react-redux";
import { selectTrackData } from "../../store/slices/playerSlice";
import * as Icons from '../icons';
import TextRegularM from '../text/text-regular-m';
import IconButton from '../buttons/icon-button';

import styles from "./footer-left.module.css";

function FooterLeft(){
    const trackData = useSelector(selectTrackData);
    
    return (
        <div className={styles.footerLeft}>
            <ImgBox 
                trackData={trackData}
            />
            <SongDetails 
                trackData={trackData}
            />
            <IconButton icon={<Icons.Like />} activeicon={<Icons.LikeActive />}/>
            <IconButton icon={<Icons.Corner />} activeicon={<Icons.Corner />}/>
        </div>
    );
}

function ImgBox({ trackData }){
    return (
        <div className={styles.imgBox}>
            <img src={trackData.trackImg} alt={trackData.trackName}/>
        </div>
    );
}

function SongDetails({ trackData }){
    return (
        <div className={styles.songDetails}>
            <TextRegularM>{trackData.trackName}</TextRegularM>
            <TextRegularM><small>{trackData.trackArtist}</small></TextRegularM>
        </div>
    );
}
  
export default FooterLeft;