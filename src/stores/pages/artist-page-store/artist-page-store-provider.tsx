import React, { createContext } from 'react'
import ArtistStore from '.'

const StoreContext = createContext(null)
 
export const ArtistStoreProvider: React.FC = ({ children }) => {

  return (
    <StoreContext.Provider value={new ArtistStore()}>{children}</StoreContext.Provider>
  )
}
 
export const useArtistStore = () => React.useContext(StoreContext) as ArtistStore
