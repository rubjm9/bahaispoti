import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import Topnav from '../component/topnav/topnav';
import TitleM from '../component/text/title-m';
import TextRegularM from '../component/text/text-regular-m';
import SearchPageCard from '../component/cards/searchpage-card';
import PlaylistCardM from '../component/cards/playlist-card-m';
import { SEARCHCARDS, PLAYLIST } from '../data/index';
import { changeTrack } from '../store/slices/playerSlice';
import useSearch from '../hooks/useSearch';
import SearchBox from '../component/topnav/search-box';
import LoadingSpinner from '../component/common/LoadingSpinner';
import styles from "./search.module.css";

function Search(){
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const { songs, playlists, isSearching, hasQuery } = useSearch(searchQuery);

    const handleSongClick = (playlistIndex, songIndex) => {
        // Validar que la canción existe antes de cambiar
        if (
            playlistIndex >= 0 &&
            songIndex >= 0 &&
            PLAYLIST[playlistIndex]?.playlistData?.[songIndex]
        ) {
            dispatch(changeTrack([playlistIndex, songIndex]));
        }
    };

    return (
        <div className={styles.SearchPage}>
            <Topnav search={true} searchBox={<SearchBox value={searchQuery} onChange={setSearchQuery} />}/>

            <div className={styles.Search}>
                {hasQuery ? (
                    <>
                        {isSearching ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                {songs.length > 0 && (
                                    <div className={styles.searchSection}>
                                        <TitleM>Canciones</TitleM>
                                        <div className={styles.searchResults}>
                                            {songs.map((song, index) => (
                                                <div 
                                                    key={`${song.playlistIndex}-${song.songIndex}`}
                                                    className={styles.searchResultItem}
                                                    onClick={() => handleSongClick(song.playlistIndex, song.songIndex)}
                                                >
                                                    <Link href={`/song/${song.index}`}>
                                                        <TextRegularM>{song.songName}</TextRegularM>
                                                        <TextRegularM><small>{song.songArtist}</small></TextRegularM>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {playlists.length > 0 && (
                                    <div className={styles.searchSection}>
                                        <TitleM>Listas de reproducción</TitleM>
                                        <div className={styles.SearchCardGrid}>
                                            {playlists.map((playlist) => (
                                                <PlaylistCardM 
                                                    key={playlist.title}
                                                    data={playlist}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {!isSearching && songs.length === 0 && playlists.length === 0 && (
                                    <div className={styles.noResults}>
                                        <TitleM>No se encontraron resultados</TitleM>
                                        <TextRegularM>Intenta con otros términos de búsqueda</TextRegularM>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <TitleM>Explorar todo</TitleM>
                        <div className={styles.SearchCardGrid}>
                            {SEARCHCARDS.map((card) => {
                                return (
                                    <SearchPageCard 
                                        key={card.title}
                                        cardData={{
                                            bgcolor: card.bgcolor,
                                            title: card.title,
                                            imgurl: card.imgurl,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Search;