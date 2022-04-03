const useDebounce = <T>(func: T, delay: number = 300) => {

    let timeout
  
    const clearTimer = () => {
      if (timeout) {
        clearTimeout(timeout)
        timeout = undefined
      }
    }
  
    const debounce: any = (...args) => {
        clearTimer()
        timeout= setTimeout(() => (func as any)(...args), delay)
    } 

    return [debounce as T, clearTimer] as [T, () => void]
}

export default useDebounce