import React from 'react'
import { Icon28ClipOutline, Icon28MessageOutline, Icon28ServicesOutline, Icon28UserCircleOutline, Icon56NewsfeedOutline } from '@vkontakte/icons'
import { Epic, Group, Panel, PanelHeader, PanelHeaderBack, Placeholder, Root, View, ModalRoot, ModalPage, ModalPageHeader, SplitLayout } from '@vkontakte/vkui'

import ModalPageStore from '../stores/modal-page-store'

import { observer } from 'mobx-react-lite'
import GlobalStore from '../stores/global-store'

import Snackbar from '../components/common/dialogs/snackbar'

import views from './views'

import MobileNav from '../components/navigation/mobile'

const ViewList: React.FC = observer(() => {

  return (

    <SplitLayout modal={
      <ModalRoot activeModal={ModalPageStore.activeModalComponent && 'defaultModalPage'}>
        <ModalPage 
        id='defaultModalPage' 
        header={ModalPageStore.activeModalComponent && 
          ModalPageStore.activeModalComponent.header &&
          ModalPageStore.activeModalComponent.header()}
        onClose={() => ModalPageStore.closeModal()}>
          {ModalPageStore.activeModalComponent && ModalPageStore.activeModalComponent.component()}
        </ModalPage>
      </ModalRoot>
    }>
      <Epic activeStory={GlobalStore.router.activeStory} tabbar={<MobileNav />}>

        {
          views.map(view =>

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
})

export default ViewList