import React, { useRef } from 'react'

const useDebounce = <T>(func: T, delay: number = 300) => {

    const timeoutRef = useRef<NodeJS.Timeout>()
  
    const clearTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = undefined
      }
    }
  
    const debounce: any = (...args) => {
        clearTimer()
        timeoutRef.current = setTimeout(() => (func as any)(...args), delay)
    } 

    return [debounce as T, clearTimer] as [T, () => void]
}

export default useDebounce