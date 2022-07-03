import React, { createContext } from 'react'
import TrackStore from '.'

const StoreContext = createContext(null)
 
export const TrackStoreProvider: React.FC = (props) => {

  return (
    <StoreContext.Provider value={new TrackStore()}>{props.children}</StoreContext.Provider>
  )
}
 
export const useTrackStore = () => React.useContext(StoreContext) as TrackStore
