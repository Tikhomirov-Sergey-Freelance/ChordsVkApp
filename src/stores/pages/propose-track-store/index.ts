import { makeAutoObservable } from 'mobx'

import { createGuid } from '../../../code/common/guid'
import { Router, VK } from 'stores/root-store'

import { snackbar } from '../../../code/common/alerts'
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
        const query = (routData && routData['query'])

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
            state: this.state,
            riff: '',
            riffNote: '',
            strummingNote: ''
        }
    }

    changeProperty(property: string, value: unknown) {

        this[property] = value

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