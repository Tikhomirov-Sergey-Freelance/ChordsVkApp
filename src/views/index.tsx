import React from 'react'
import { Icon28ClipOutline, Icon28MessageOutline, Icon28ServicesOutline, Icon28UserCircleOutline, Icon56NewsfeedOutline } from '@vkontakte/icons'
import { Epic, Group, Panel, PanelHeader, PanelHeaderBack, Placeholder, Root, View, ModalRoot, ModalPage, ModalPageHeader, SplitLayout } from '@vkontakte/vkui'

import ModalPageStore from '../stores/modal-page-store'

import { observer } from 'mobx-react-lite'
import GlobalStore from '../stores/global-store'

import Snackbar from '../components/common/dialogs/snackbar'

import Modals from './modals'
import Views from './views'

import MobileNav from '../components/navigation/mobile'

const ViewList: React.FC = () => {

  return (

    <SplitLayout modal={
      <ModalRoot activeModal={GlobalStore.modal.activeModalComponent?.key}>
        <ModalPage
          id='defaultModalPage'
          header={GlobalStore.modal.activeModalComponent?.modalData?.header &&
            GlobalStore.modal.activeModalComponent.modalData.header()}
          onClose={() => GlobalStore.modal.closeModal()}>
          {GlobalStore.modal.activeModalComponent?.modalData?.component &&
          GlobalStore.modal.activeModalComponent.modalData.component()}
        </ModalPage>
        {Modals}
      </ModalRoot> 
    }>
      <Epic activeStory={GlobalStore.router.activeStory} tabbar={<MobileNav />}>

        {
          Views.map(view =>

            <View id={view.id} activePanel={GlobalStore.router.activePanel}>

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