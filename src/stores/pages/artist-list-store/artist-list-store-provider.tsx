import React, { createContext } from 'react'
import ArtistListStore from '.'

const StoreContext = createContext(null)
 
export const ArtistListStoreProvider = ({ children }) => {

  return (
    <StoreContext.Provider value={new ArtistListStore()}>{children}</StoreContext.Provider>
  )
}
 
export const useArtistListStore = () => React.useContext(StoreContext) as ArtistListStore
