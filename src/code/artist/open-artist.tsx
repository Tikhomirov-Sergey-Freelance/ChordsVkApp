import React from 'react'
import { iTrackView } from 'types/track'
import GlobalStore from '../../stores/global-store'
import ModalPageStore from '../../stores/modal-page-store'
import { loadArtistById } from 'code/firebase/artists'
import { iArtist } from 'types/artists'

import Artist from '../../components/tracks/artist-page'
import ArtistHeader from '../../components/tracks/artist-page/header'
import ArtistPageStore from 'stores/artist-page-store'

export const loadAndOpenArtist = async (artistId: string) => {

    const store = new ArtistPageStore()
    store.loadArtist(artistId)
    openArtistModalPage(store)
}

export const openArtist = async (artist: iArtist) => {

    const store = new ArtistPageStore(artist)
    openArtistModalPage(store)
}

export const openArtistModalPage = async (store: ArtistPageStore) => {

    const header = () => <ArtistHeader store={store} onClose={() => ModalPageStore.closeModal()} />
    const component = () => <Artist store={store} onClose={() => ModalPageStore.closeModal()} />

    const onClose = (data) => {
        if(data === 'edit') return
        GlobalStore.setActiveStory('tracks')
    }

    ModalPageStore.openModal(component, onClose, header)
}