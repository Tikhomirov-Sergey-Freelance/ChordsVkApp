import { makeAutoObservable, observable } from 'mobx'

import { createGuid } from '../../../code/common/guid'
import { Global, Router, VK } from 'stores/root-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'

import { snackbar } from '../../../code/common/alerts'
import { iArtist, iShortArtist } from 'types/artists'
import { saveArtistLogo } from 'code/database/images'
import { addArtist, updateArtist } from 'code/database/artists'
import { loadTracksByArtist, updateTracksSearchName } from 'code/database/tracks'
import { iTrack } from 'types/track'
import { iProposeTrack, ProposeTrackType } from 'types/propose-track'
import { addProposeTrack } from 'code/database/propose-track'
import { iTrackCandidate, TrackCandidateState } from 'types/track-candidate'
import { addTrackCandidate } from 'code/database/track-candidates'

export interface iProposeTrackErrors {
    artist: string
    track: string
}

export class ProposeTrackStore {

    id: string
    userId: string

    track: string
    artist: string
    comment: string

    state: TrackCandidateState = 'active'

    showErrors: boolean

    constructor() {

        const routData = Router.activePanelData
        const query = (routData && routData.query)

        this.track = query || ''
        this.id = createGuid()

        makeAutoObservable(this)
    }

    async save() {

        if (!this.validate()) return

        const track = this.dataToSave
        const result = await addTrackCandidate(track)

        Router.toMainPanel()
        snackbar(result ?
            'Запрос на добавление трека отправлен' :
            'Во время отправки запроса произошла ошибка')
    }

    validate() {

        let isValid = true

        const errors: iProposeTrackErrors = {
            artist: '',
            track: ''
        }

        if (!this.artist) {
            errors.artist = 'Пожалуйста, введите исполнителя'
            isValid = false
        }

        if (!this.track) {
            errors.track = 'Пожалуйста, введите наименование трека'
            isValid = false
        }   

        this.errors = errors
        this.showErrors = true

        return isValid
    }

    get dataToSave(): iTrackCandidate {
        return {
            id: this.id,
            userId: VK.vkId.toString(),
            name: this.track,
            artist: this.artist,
            chordsNote: this.comment,
            state: this.state
        }
    }

    changeProperty(property: keyof this, value: any) {
        this[property as keyof this] = value

        if (this.showErrors) {
            this.validate()
        }
    }

    errors: iProposeTrackErrors = {
        track: '',
        artist: ''
    }
}



export default ProposeTrackStore