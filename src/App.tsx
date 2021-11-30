import React from 'react'
import { AppRoot, Panel, View } from '@vkontakte/vkui'
import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui'

declare var window: any

import '@vkontakte/vkui/dist/vkui.css'

import Layout from './components/layout/page-layout'
import ViewList from './components/views/view-list'
import Snackbar from './components/common/dialogs/snackbar'

const App: React.FC = () => {

  return (

    <Layout >
      <ViewList />
    </Layout>
  )
}

export default App
