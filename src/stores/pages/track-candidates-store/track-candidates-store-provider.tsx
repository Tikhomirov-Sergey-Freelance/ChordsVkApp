import React, { createContext } from 'react'
import TrackCandidatesStore from '.'

const StoreContext = createContext(null)
 
export const TrackCandidatesStoreProvider: React.FC = ({ children }) => {

  return (
    <StoreContext.Provider value={new TrackCandidatesStore()}>{children}</StoreContext.Provider>
  )
}
 
export const useTrackCandidatesStore = () => React.useContext(StoreContext) as TrackCandidatesStore
