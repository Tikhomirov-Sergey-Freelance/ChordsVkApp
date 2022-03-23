import GlobalStore from 'stores/global-store'
import ModalPageStore from 'stores/modal-page-store'
import { iArtist } from 'types/artists'

export const editArtist = (artist: iArtist) => {

    const mobxArtistObject = artist as any
    const dataRoute = {
        artist: mobxArtistObject.toJS ? mobxArtistObject.toJS() : mobxArtistObject
    }
 
    GlobalStore.setActiveStory('admin', 'addArtist', dataRoute)
    ModalPageStore.closeModal('edit')
}