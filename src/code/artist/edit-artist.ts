import { Modal, Router } from 'stores/root-store'
import { iArtist } from 'types/artists'

export const editArtist = (artist: iArtist) => {

    const mobxArtistObject = artist as iArtist & { toJS: () => iArtist }
    const dataRoute = {
        artist: mobxArtistObject.toJS ? mobxArtistObject.toJS() : mobxArtistObject
    }
 
    Router.setActiveStory('admin', 'addArtist', dataRoute)
    Modal.closeModal('edit')
}