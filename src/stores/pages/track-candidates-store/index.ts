import { changeTrackCandidateState, loadActiveCandidatesList } from 'code/database/track-candidates'
import { makeAutoObservable } from 'mobx'
import { iTrackCandidatesView } from 'types/track-candidate'

export interface iProposeTrackErrors {
    artist: string
    track: string
}

export class TrackCandidatesStore {

    loading: boolean

    tracks: iTrackCandidatesView[]

    constructor() {

        this.load()
        makeAutoObservable(this)

        this.cancellTrack = this.cancellTrack.bind(this)
    }

    async load() {

        this.loading = true

        this.tracks = await loadActiveCandidatesList()
        this.loading = false
    }

    async cancellTrack(id: string) {

        changeTrackCandidateState(id, 'cancel')
        this.tracks = this.tracks.filter(track => track.id !== id)
    }
}

export default TrackCandidatesStore