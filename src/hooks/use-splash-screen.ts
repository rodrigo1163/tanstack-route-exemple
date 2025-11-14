import { useEffect, useRef, useState } from 'react'

interface UseSplashScreen {
  showSplash: boolean
  visible: boolean
}

/**
 * Hook para controlar SplashScreen com threshold e fade out.
 * @param loading Se está carregando (ex: sessão indefinida)
 * @param minMs Tempo mínimo de exibição (default: 500ms)
 * @param fadeMs Duração do fade out (default: 300ms)
 */
export function useSplashScreen(
  loading: boolean,
  minMs = 500,
  fadeMs = 300
): UseSplashScreen {
  const [showSplash, setShowSplash] = useState(true)
  const [visible, setVisible] = useState(true)
  const mountTime = useRef<number>(Date.now())

  useEffect(() => {
    if (loading) {
      setShowSplash(true)
      setVisible(true)
      mountTime.current = Date.now()
      return
    }
    // Quando loading vira false, espera o threshold mínimo
    const elapsed = Date.now() - mountTime.current
    const wait = Math.max(minMs - elapsed, 0)
    const t1 = setTimeout(() => {
      setVisible(false) // inicia fade out
      // Após fade, remove do DOM
      const t2 = setTimeout(() => setShowSplash(false), fadeMs)
      return () => clearTimeout(t2)
    }, wait)
    return () => clearTimeout(t1)
  }, [loading, minMs, fadeMs])

  return { showSplash, visible }
}
