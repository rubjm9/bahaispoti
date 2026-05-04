'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TextBoldM from '../text/text-bold-m';

import { LIBRARYTABS } from '../../constants/index';
import styles from './library-tab-btn.module.css';

function LibraryTabBtn() {
    const pathname = usePathname();
    return (
        <nav className={styles.TabNav}>
            {LIBRARYTABS.map((item) => {
                const isActive = pathname != null && pathname === item.path;
                return (
                    <Link
                        key={item.title}
                        href={item.path}
                        className={`${styles.tabBtn}${isActive ? ' activeTabBtn' : ''}`}
                    >
                        <TextBoldM>{item.title}</TextBoldM>
                    </Link>
                );
            })}
        </nav>
    );
}

export default LibraryTabBtn;
