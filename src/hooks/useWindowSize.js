import { useState, useLayoutEffect } from 'react'

/**
 * Tamaño de ventana estable para SSR/hidratación: el primer render en servidor
 * y cliente usa width/height undefined; la medición real ocurre en useLayoutEffect.
 */
function useWindowSize() {
  const [windowSize, setWindowSize] = useState(() => ({
    width: undefined,
    height: undefined,
  }))

  useLayoutEffect(() => {
    function getSize() {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    }

    setWindowSize(getSize())

    window.addEventListener('resize', getSize)
    return () => window.removeEventListener('resize', getSize)
  }, [])

  return windowSize
}

export default useWindowSize
