import React from 'react'
import { Icon28ClipOutline, Icon28MessageOutline, Icon28ServicesOutline, Icon28UserCircleOutline, Icon56NewsfeedOutline } from '@vkontakte/icons'
import { Epic, Group, Panel, PanelHeader, PanelHeaderBack, Placeholder, Root, View } from '@vkontakte/vkui'

import { observer } from 'mobx-react-lite'
import GlobalStore from '../../stores/global-store'

import Tracks from './tracks'
import Chords from './chords'
import Favourites from './favourites'
import AddTrack from './add-track'
import Admin from './admin'
import AdminAddChords from './admin/add-chords'
import AdminAddArtist from './admin/add-artist'

import MobileNav from '../navigation/mobile'

const ViewList: React.FC = observer(() => {

  return (

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
      </View >

    </Epic>
  )
})

export default ViewList