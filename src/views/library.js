import React from 'react';
import TitleM from '../component/text/title-m';
import Topnav from '../component/topnav/topnav';
import PlaylistCardM from '../component/cards/playlist-card-m'
import { PLAYLIST } from "../data/index";

import styles from "./library.module.css";

export function LibraryShell({ children }) {
    return (
        <div className={styles.LibPage}>
                <Topnav tabButtons={true}/>
                <div className={styles.Library}>
                        {children}
                </div>
        </div>
    );
}

export function PlaylistTab(){
    return (
        <div>
            <TitleM>Çalma Listeleri</TitleM>
            <div className={styles.Grid}>
                {PLAYLIST.filter(item => item.type === 'playlist').map((item) => {
                    return (
                        <PlaylistCardM 
                            key={item.title}
                            data={item}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export function PodcastTab(){
    return (
        <div>
            <TitleM>{'Podcast\u2019ler'}</TitleM>
            <div className={styles.Grid}>
                {PLAYLIST.filter(item => item.type === 'podcast').map((item) => {
                    return (
                        <PlaylistCardM 
                            key={item.title}
                            data={item}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export function ArtistTab(){
    return (
        <div>
            <TitleM>Sanatçılar</TitleM>
        </div>
    );
}

export function AlbumTab(){
    return (
        <div>
            <TitleM>Albümler</TitleM>
            <div className={styles.Grid}>
                {PLAYLIST.filter(item => item.type === 'álbum').map((item) => {
                    return (
                        <PlaylistCardM 
                            key={item.title}
                            data={item}
                        />
                    );
                })}
            </div>
        </div>
    );
}
