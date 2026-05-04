import { useState, useEffect, useMemo } from 'react';

/**
 * Hook para manejar letras sincronizadas
 * @param {Array} syncedLyrics - Array de objetos con {text, startTime, endTime, line}
 * @param {number} currentTime - Tiempo actual de reproducción en segundos
 * @returns {Object} Objeto con línea activa y funciones útiles
 */
function useSynchronizedLyrics(syncedLyrics, currentTime) {
  const [activeLineIndex, setActiveLineIndex] = useState(-1);

  const activeLine = useMemo(() => {
    if (!syncedLyrics || syncedLyrics.length === 0) {
      return null;
    }

    // Encontrar la línea activa basada en el tiempo actual
    const index = syncedLyrics.findIndex((line, idx) => {
      const nextLine = syncedLyrics[idx + 1];
      return currentTime >= line.startTime && 
             (!nextLine || currentTime < nextLine.startTime);
    });

    return index >= 0 ? syncedLyrics[index] : null;
  }, [syncedLyrics, currentTime]);

  useEffect(() => {
    if (syncedLyrics && syncedLyrics.length > 0) {
      const index = syncedLyrics.findIndex((line, idx) => {
        const nextLine = syncedLyrics[idx + 1];
        return currentTime >= line.startTime && 
               (!nextLine || currentTime < nextLine.startTime);
      });
      setActiveLineIndex(index);
    }
  }, [currentTime, syncedLyrics]);

  // Agrupar líneas por número de línea para mostrar juntas
  const groupedLines = useMemo(() => {
    if (!syncedLyrics || syncedLyrics.length === 0) {
      return [];
    }

    const groups = {};
    syncedLyrics.forEach((line) => {
      const lineNum = line.line || 1;
      if (!groups[lineNum]) {
        groups[lineNum] = [];
      }
      groups[lineNum].push(line);
    });

    return Object.values(groups).map(group => ({
      lines: group,
      startTime: group[0].startTime,
      endTime: group[group.length - 1].endTime,
      text: group.map(l => l.text).join(' ')
    }));
  }, [syncedLyrics]);

  return {
    activeLine,
    activeLineIndex,
    groupedLines,
    hasSyncedLyrics: syncedLyrics && syncedLyrics.length > 0
  };
}

export default useSynchronizedLyrics;
