import React, { createContext } from 'react'
import MainPageStore from '.'

const StoreContext = createContext(null)
 
export const MainPageStoreProvider = ({ children }) => {

  return (
    <StoreContext.Provider value={new MainPageStore()}>{children}</StoreContext.Provider>
  )
}
 
export const useMainPageStore = () => React.useContext(StoreContext) as MainPageStore
