'use client';

import React, { Suspense } from 'react';
import useWindowSize from '@/src/hooks/useWindowSize';
import Sidebar from '@/src/component/sidebar/sidebar';
import MobileNavigation from '@/src/component/sidebar/mobile-navigation';
import Footer from '@/src/component/footer/footer';
import LoadingSpinner from '@/src/component/common/LoadingSpinner';
import CONST from '@/src/constants/index';
import styles from '@/src/style/App.module.css';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const size = useWindowSize();

  return (
    <div className={styles.layout}>
      {size.width > CONST.MOBILE_SIZE ? <Sidebar /> : <MobileNavigation />}
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
      <Footer />
    </div>
  );
}
