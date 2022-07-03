import { useRef } from 'react'

type debounceAction<T> = T & { apply: (context, ...args) => void }

const useDebounce = <T>(func: debounceAction<T>, delay = 300) => {

    const timeoutRef = useRef<NodeJS.Timeout>()
  
    const clearTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
      }
    }
  
    const debounce = ((...args) => {
        clearTimer()
        timeoutRef.current = setTimeout(() => func.apply(null, ...args), delay)
    }) as unknown as T

    return [debounce, clearTimer] as [debounceAction<T>, () => void]
}

export default useDebounce