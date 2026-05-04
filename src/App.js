import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useWindowSize from './hooks/useWindowSize';
import Sidebar from './component/sidebar/sidebar';
import MobileNavigation from './component/sidebar/mobile-navigation';
import Footer from './component/footer/footer';
import LoadingSpinner from './component/common/LoadingSpinner';

import CONST from './constants/index';
import styles from './style/App.module.css';

// Lazy loading de páginas
const Home = lazy(() => import('./pages/home'));
const Search = lazy(() => import('./pages/search'));
const Library = lazy(() => import('./pages/library'));
const PlaylistPage = lazy(() => import('./pages/playlist'));
const SongDetail = lazy(() => import('./pages/song-detail'));
const Favorites = lazy(() => import('./pages/favorites'));
const History = lazy(() => import('./pages/history'));
const PresentationMode = lazy(() => import('./pages/presentation-mode'));

function App() {
  const size = useWindowSize();

  return (
    <Router>
      <div className={styles.layout}>
        {size.width > CONST.MOBILE_SIZE 
          ? <Sidebar /> 
          : <MobileNavigation />
        }
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library/*" element={<Library />} />
            <Route path="/playlist/:path" element={<PlaylistPage />} />
            <Route path="/song/:songId" element={<SongDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
            <Route path="/presentation/:songId" element={<PresentationMode />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;