import { getLastTracksFromLocalStorage, saveLastTrackToLocalStorage } from 'code/tracks/last-tracks'
import { makeAutoObservable, makeObservable, observable, toJS } from 'mobx'
import { MusicalInstrument } from 'types/global-types'

export class GlobalStore {

    isAdmin: boolean

    currentInstrument: MusicalInstrument = 'guitar'
    lastViewedTracks: string[]

    constructor() {

        if(!global['window']) return

        this.isAdmin = window.isAdmin
        this.lastViewedTracks = getLastTracksFromLocalStorage()

        makeObservable(this, {
            currentInstrument: observable,
            lastViewedTracks: observable
        })
    }
    
    changeInstrument(instrument: MusicalInstrument) {
        this.currentInstrument = instrument
    }

    saveLastViewedTrack(trackId: string) {
    
        let lastTracks = toJS(this.lastViewedTracks)

        if(lastTracks.includes(trackId)) {
            const index = lastTracks.findIndex(track => track === trackId)
            lastTracks.splice(index)
        }
    
        if(lastTracks.length === 5) {
            lastTracks.pop()
        }
    
        lastTracks.splice(0, 0, trackId)
        this.lastViewedTracks = lastTracks

        saveLastTrackToLocalStorage(this.lastViewedTracks)
    }
}

export default GlobalStore