import React from 'react'
import { Icon28ClipOutline, Icon28MessageOutline, Icon28ServicesOutline, Icon28UserCircleOutline, Icon56NewsfeedOutline } from '@vkontakte/icons'
import { Epic, Group, Panel, PanelHeader, PanelHeaderBack, Placeholder, Root, View, ModalRoot, ModalPage, ModalPageHeader, SplitLayout } from '@vkontakte/vkui'

import ModalPageStore from '../../stores/modal-page-store'
import SelectChordsModal from '../tracks/add-track/chords/select-chords-modal'

import { observer } from 'mobx-react-lite'
import GlobalStore from '../../stores/global-store'

import Tracks from './tracks'
import Chords from './chords'
import Favourites from './favourites'
import AddTrack from './add-track'
import Admin from './admin'
import AdminAddChords from './admin/add-chords'
import AdminAddArtist from './admin/add-artist'
import AdminAddTrack from './admin/add-track'

import MobileNav from '../navigation/mobile'

const ViewList: React.FC = observer(() => {

  return (

    <SplitLayout modal={
      <ModalRoot activeModal={ModalPageStore.activeModalComponent && 'defaultModalPage'}>
        <ModalPage id='defaultModalPage' onClose={() => ModalPageStore.closeModal()}>
            {ModalPageStore.activeModalComponent && ModalPageStore.activeModalComponent.component()}
        </ModalPage>
      </ModalRoot>
    }>
      <Epic activeStory={GlobalStore.activeStory} tabbar={<MobileNav />}>

        <View id='tracks' activePanel={GlobalStore.activePanel}>
          <Panel id='tracks'>
            <Tracks />
          </Panel>
        </View >

        <View id='chords' activePanel={GlobalStore.activePanel}>
          <Panel id='chords'>
            <Chords />
          </Panel>
        </View >

        <View id='favourites' activePanel={GlobalStore.activePanel}>
          <Panel id='favourites'>
            <Favourites />
          </Panel>
        </View >

        <View id='admin' activePanel={GlobalStore.activePanel}>
          <Panel id='admin'>
            <Admin />
          </Panel>
          <Panel id='addChords'>
            <AdminAddChords />
          </Panel>
          <Panel id='addArtist'>
            <AdminAddArtist />
          </Panel>
          <Panel id='addTrack'>
            <AdminAddTrack />
          </Panel>
        </View >

      </Epic>
    </SplitLayout>
  )
})

export default ViewList