import PrevPageBtn from '../buttons/prev-page-button';
import NextPageBtn from '../buttons/next-page-button';
import SearchBox from './search-box';
import LibraryTabBtn from './library-tab-btn';
import ThemeToggle from '../common/ThemeToggle';

import styles from './topnav.module.css';

function Topnav({search = false, tabButtons = false, searchBox}) {
    return (
      <nav className={styles.Topnav} role="navigation" aria-label="Navegación principal">
          <div>
                <span>
                    <PrevPageBtn />
                    <NextPageBtn />
                    { search ? (searchBox || <SearchBox />) : '' }
                    { tabButtons ? <LibraryTabBtn /> : '' }
                </span>
                <span>
                    <ThemeToggle />
                    <button className={styles.ProfileBtn} aria-label="Perfil de usuario">
                        Oğuzhan Ulukaya
                    </button>
                </span>
          </div>
      </nav>
    );
}
  
export default Topnav;