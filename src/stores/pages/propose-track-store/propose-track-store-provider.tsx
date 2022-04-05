import React, { createContext } from 'react'
import ProposeTrackStore from '.'

const StoreContext = createContext(null)
 
export const ProposeTrackStoreProvider = ({ children }) => {

  return (
    <StoreContext.Provider value={new ProposeTrackStore()}>{children}</StoreContext.Provider>
  )
}
 
export const useProposeTrackStore = () => React.useContext(StoreContext) as ProposeTrackStore
