import React from 'react'
import { iTrackView } from 'types/track'
import GlobalStore from '../../stores/global-store'
import ModalPageStore from '../../stores/modal-page-store'
import { loadArtistById } from 'code/firebase/artists'
import { iArtist } from 'types/artists'

import Artist from '../../components/tracks/artist-page'
import ArtistHeader from '../../components/tracks/artist-page/header'
import ArtistPageStore from 'stores/artist-page-store'

export const openArtist = (artistId: string) => {
    openArtistModalPage(artistId)
}

export const openArtistModalPage = (artistId: string) => {
    GlobalStore.modal.openModal('artist', { data: { artistId }, saveHistory: true })
}