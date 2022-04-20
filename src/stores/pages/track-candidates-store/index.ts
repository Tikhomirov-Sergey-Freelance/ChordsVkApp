import { loadCandidatesList } from 'code/database/track-candidates'
import { makeAutoObservable, observable } from 'mobx'
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
    }

    async load() {

        this.loading = true

        this.tracks = await loadCandidatesList()
        console.log(this.tracks)
        this.loading = false
    }
}

export default TrackCandidatesStore