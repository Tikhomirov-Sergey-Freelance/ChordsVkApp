import React, { createContext } from 'react'
import TrackCandidatesStore from '.'

const StoreContext = createContext(null)
 
export const TrackCandidatesStoreProvider = ({ children }) => {

  return (
    <StoreContext.Provider value={new TrackCandidatesStore()}>{children}</StoreContext.Provider>
  )
}
 
export const useTrackCandidatesStore = () => React.useContext(StoreContext) as TrackCandidatesStore
