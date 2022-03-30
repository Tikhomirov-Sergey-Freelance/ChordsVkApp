import React from 'react'
import { Icon28ClipOutline, Icon28MessageOutline, Icon28ServicesOutline, Icon28UserCircleOutline, Icon56NewsfeedOutline } from '@vkontakte/icons'
import { Epic, Group, Panel, PanelHeader, PanelHeaderBack, Placeholder, Root, View, ModalRoot, ModalPage, ModalPageHeader, SplitLayout } from '@vkontakte/vkui'

import { Modal, Global, Router } from 'stores/root-store'

import { observer } from 'mobx-react-lite'

import Snackbar from '../components/common/dialogs/snackbar'

import Modals from './modals'
import Views from './views'

import MobileNav from '../components/navigation/mobile'

const ViewList: React.FC = () => {

  return (

    <SplitLayout modal={
      <ModalRoot activeModal={Modal.activeModalComponent?.key}>
        <ModalPage
          id='defaultModalPage'
          header={Modal.activeModalComponent?.modalData?.header &&
            Modal.activeModalComponent.modalData.header()}
          onClose={() => Modal.closeModal()}>
          {Modal.activeModalComponent?.modalData?.component &&
          Modal.activeModalComponent.modalData.component()}
        </ModalPage>
        {Modals}
      </ModalRoot> 
    }>
      <Epic activeStory={Router.activeStory} tabbar={<MobileNav />}>

        {
          Views.map(view =>

            <View id={view.id} activePanel={Router.activePanel}>

              {
                view.panels.map(panel =>
                  <Panel id={panel.id}>
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