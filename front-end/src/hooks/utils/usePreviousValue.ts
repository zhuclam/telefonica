import { useEffect, useRef } from 'react'

export const usePreviousValue = <T>(value: T): T => {
  const prev = useRef<T>(value)
  useEffect(() => {
    prev.current = value
  })
  return prev.current
}
