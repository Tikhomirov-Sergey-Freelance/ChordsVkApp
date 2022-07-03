type debounceAction<T> = T & { apply: (context, ...args) => void }

const useDebounce = <T>(func: debounceAction<T>, delay = 300) => {

    let timeout
  
    const clearTimer = () => {
      if (timeout) {
        clearTimeout(timeout)
        timeout = undefined
      }
    }
  
    const debounce = ((...args) => {
        clearTimer()
        timeout= setTimeout(() => func.apply(null, ...args), delay)
    }) as unknown as debounceAction<T>

    return [debounce as T, clearTimer] as [T, () => void]
}

export default useDebounce