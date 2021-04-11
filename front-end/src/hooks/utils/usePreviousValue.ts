import { useEffect, useRef } from 'react'

export const usePreviousValue = (value: any) => {
  const prev = useRef<any>(value)
  useEffect(() => {
    prev.current = value
  })
  return prev.current
}
