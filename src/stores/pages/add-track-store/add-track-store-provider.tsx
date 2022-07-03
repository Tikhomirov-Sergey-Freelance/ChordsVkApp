import React, { createContext } from 'react'
import AddTrackStore from '.'

const StoreContext = createContext(null)
 
export const AddTrackStoreProvider: React.FC = ({ children }) => {

  return (
    <StoreContext.Provider value={new AddTrackStore()}>{children}</StoreContext.Provider>
  )
}
 
export const useAddTrackStore = () => React.useContext(StoreContext) as AddTrackStore
