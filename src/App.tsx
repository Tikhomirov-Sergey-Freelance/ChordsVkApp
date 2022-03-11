import React from 'react'
import ReactDom from 'react-dom'
import { AppRoot, Panel, View } from '@vkontakte/vkui'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'

declare var window: any

import '@vkontakte/vkui/dist/vkui.css'

import Layout from './components/layout/page-layout'
import ViewList from './components/views/view-list'

declare global {
  interface Window {
    firebaseToken: string
    validVk: boolean
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
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <Layout >
            <ViewList />
          </Layout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  )
}

export default App
