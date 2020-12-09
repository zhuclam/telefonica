import { useAlerts } from 'components'
import { useEffect, useRef, useCallback } from 'react'

const useThrottle = <T extends (...args: any) => any>(
  cb: T,
  timeout: number
) => {
  const timeoutRef = useRef<number | undefined>(undefined)
  const readyRef = useRef<boolean>(true)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const { AlertManager } = useAlerts()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    ((...args: any) => {
      if (readyRef.current === false) {
        AlertManager.show('not-so-fast', { timeout: 3000 })
        return
      }
      cb(...args)
      readyRef.current = false

      timeoutRef.current = setTimeout(() => {
        readyRef.current = true
      }, timeout)
    }) as T,
    [cb, timeout]
  )
}

export { useThrottle }
