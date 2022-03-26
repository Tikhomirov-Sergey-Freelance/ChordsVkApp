import React from 'react'
import ReactDom from 'react-dom'
import { AppRoot } from '@vkontakte/vkui'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'

declare var window: any

import '@vkontakte/vkui/dist/vkui.css'

import GlobalStore from 'stores/global-store'

import ViewList from './views'

declare global {
  interface Window {
    firebaseToken: string
    validVk: boolean
    isAdmin: boolean
    isServer: boolean
  }
}

try {
  console.log(window);
} catch (err) {
  global['window'] = { isServer: true } as any
}

const App: React.FC = () => {
  
  return (
    <ConfigProvider appearance={GlobalStore.appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <ViewList />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default App
