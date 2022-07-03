import React from 'react'
import { AppRoot } from '@vkontakte/vkui'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'

import '@vkontakte/vkui/dist/vkui.css'

import ViewList from './views'
import { VK } from 'stores/root-store'
import { observer } from 'mobx-react-lite'

declare global {
  interface Window {
    firebaseToken: string
    validVk: boolean
    vkId: string
    isAdmin: boolean
    isServer: boolean
  }
}

const App: React.FC = () => {

  return (
    <ConfigProvider appearance={VK.appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <ViewList />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default observer(App)
