import { ModalKey } from '.'

import TrackPageStore from '../track-page-store'
import ArtistPageStore from '../artist-page-store'

export const createStoreByModalKey = (key: ModalKey, data: any) => {

    switch(key) {

        case 'track':
            return new TrackPageStore(data.trackId)

        case 'artist':
            return new ArtistPageStore(data.artistId)

    }
}