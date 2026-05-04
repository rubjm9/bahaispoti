import React, { useRef, useEffect } from 'react';
import useSynchronizedLyrics from '../../hooks/useSynchronizedLyrics';
import styles from './SynchronizedLyrics.module.css';

function SynchronizedLyrics({ syncedLyrics, currentTime, staticLyrics, className }) {
  const containerRef = useRef(null);
  const activeLineRef = useRef(null);
  const { activeLine, activeLineIndex, groupedLines, hasSyncedLyrics } = useSynchronizedLyrics(
    syncedLyrics,
    currentTime
  );

  // Auto-scroll a la línea activa
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeElement = activeLineRef.current;
      
      const containerHeight = container.clientHeight;
      const elementTop = activeElement.offsetTop;
      const elementHeight = activeElement.offsetHeight;
      const scrollTop = container.scrollTop;

      // Calcular si el elemento está fuera de la vista
      if (elementTop < scrollTop || elementTop + elementHeight > scrollTop + containerHeight) {
        // Scroll suave al elemento activo
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  }, [activeLineIndex]);

  // Si no hay letras sincronizadas, mostrar letras estáticas
  if (!hasSyncedLyrics) {
    return (
      <div className={`${styles.container} ${className || ''}`}>
        <div className={styles.staticLyrics}>
          <pre className={styles.lyricsText}>{staticLyrics || 'Letras no disponibles'}</pre>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className || ''}`} ref={containerRef}>
      <div className={styles.lyricsList}>
        {groupedLines.map((group, index) => {
          const isActive = index === activeLineIndex || 
                          (activeLine && group.lines.some(l => l === activeLine));
          
          return (
            <div
              key={index}
              ref={isActive ? activeLineRef : null}
              className={`${styles.lyricsLine} ${isActive ? styles.active : ''}`}
            >
              {group.text}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SynchronizedLyrics;
