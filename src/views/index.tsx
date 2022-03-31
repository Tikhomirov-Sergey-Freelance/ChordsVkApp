import React from 'react'
import { Epic, Group, Panel, View, ModalRoot, ModalPage, ModalPageHeader, SplitLayout } from '@vkontakte/vkui'

import { Modal, Router } from 'stores/root-store'

import { observer } from 'mobx-react-lite'

import Snackbar from '../components/common/dialogs/snackbar'

import Modals from './modals'
import Views from './views'

import MobileNav from '../components/navigation/mobile'

const ViewList: React.FC = () => {

  return (

    <SplitLayout modal={
      <ModalRoot activeModal={Modal.activeModalComponent?.key}>
        {Modals}
      </ModalRoot> 
    }>
      <Epic activeStory={Router.activeStory} tabbar={<MobileNav />}>

        {
          Views.map(view =>

            <View key={view.id} id={view.id} activePanel={Router.activePanel}>

              {
                view.panels.map(panel =>
                  <Panel key={panel.id} id={panel.id}>
                    {panel.render()}
                    <Snackbar />
                  </Panel>
                )
              }
            </View >
          )
        }

      </Epic>
    </SplitLayout>
  )
}

export default observer(ViewList)