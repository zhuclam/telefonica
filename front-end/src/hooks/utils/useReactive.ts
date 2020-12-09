import { useCallback } from 'react'
import { useRerender } from '.'

const useReactive = () => {
  const { forceUpdate } = useRerender()

  const reactive = useCallback(
    <T extends (...args: any[]) => any>(cb: T) =>
      ((...args) => {
        const returnData = cb(...args)
        forceUpdate()
        return returnData
      }) as T,
    [forceUpdate]
  )

  return { reactive }
}

export { useReactive }
