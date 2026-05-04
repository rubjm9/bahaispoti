'use client';

import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MENU } from '../../constants'
import TextBoldM from '../text/text-bold-m';
import styles from './navigation.module.css';

function isMenuActive(pathname, menuPath) {
  if (pathname == null) return false;
  if (menuPath === '/') return pathname === '/';
  return pathname === menuPath || pathname.startsWith(`${menuPath}/`);
}

function Navigation() {
  const pathname = usePathname();

  return (
    <div className={styles.navBtns}>
      {MENU.map((menu) => {
        const selected = pathname === menu.path
        const activeClass = isMenuActive(pathname, menu.path) ? 'activeLink' : '';

        return (
            <Link
              href={menu.path}
              className={activeClass}
              key={menu.title}
            >
                <button className={styles.button}>
                    {selected ? menu.iconSelected : menu.icon}
                    <TextBoldM>{menu.title}</TextBoldM>
                </button>
            </Link>
            );
      })}
    </div>
  )
}

export default Navigation