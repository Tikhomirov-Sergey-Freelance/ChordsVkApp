import React, { createContext } from 'react'
import AddArtistStore from '.'

const StoreContext = createContext(null)
 
export const AddArtistStoreProvider:React.FC = ({ children }) => {

  return (
    <StoreContext.Provider value={new AddArtistStore()}>{children}</StoreContext.Provider>
  )
}
 
export const useAddArtistStore = () => React.useContext(StoreContext) as AddArtistStore
