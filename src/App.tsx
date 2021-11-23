import React from 'react'
import { AppRoot, Panel, View } from '@vkontakte/vkui'

import '@vkontakte/vkui/dist/vkui.css'

import Layout from './components/layout/page-layout'
import ViewList from './components/views/view-list'
import Snackbar from './components/common/dialogs/snackbar'

const App: React.FC = () => {

  return (
    <AppRoot>

      <Layout >
        <ViewList />
      </Layout>

    </AppRoot>
  )
}

export default App
