import React, { createContext } from 'react'
import TrackStore from '.'

const StoreContext = createContext(null)
 
export const TrackStoreProvider = ({ children }) => {

  return (
    <StoreContext.Provider value={new TrackStore()}>{children}</StoreContext.Provider>
  )
}
 
export const useTrackStore = () => React.useContext(StoreContext) as TrackStore
