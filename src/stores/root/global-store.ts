import { getLastTracksFromLocalStorage, saveLastTrackToLocalStorage } from 'code/tracks/last-tracks'
import { makeAutoObservable, makeObservable, observable, toJS } from 'mobx'
import { MusicalInstrument } from 'types/global-types'

export class GlobalStore {

    isAdmin: boolean

    currentInstrument: MusicalInstrument = 'guitar'
    lastViewedTracks: string[] = []

    currentInstrumentKey = 'currentInstrument'

    constructor() {

        if(!global['window']) return

        this.isAdmin = window.isAdmin
        this.lastViewedTracks = getLastTracksFromLocalStorage()

        this.currentInstrument = this.loadCurrentInstrument()
        
        makeObservable(this, {
            currentInstrument: observable,
            lastViewedTracks: observable
        })
    }
    
    changeInstrument(instrument: MusicalInstrument) {
        this.currentInstrument = instrument
        this.saveCurrentInstrument()
    }

    saveLastViewedTrack(trackId: string) {
    
        let lastTracks = toJS(this.lastViewedTracks)

        if(lastTracks.includes(trackId)) {
            const index = lastTracks.findIndex(track => track === trackId)
            lastTracks.splice(index, 1)
        }
    
        if(lastTracks.length >= 3) {
            lastTracks.pop()
        }
    
        lastTracks.splice(0, 0, trackId)
        this.lastViewedTracks = lastTracks

        saveLastTrackToLocalStorage(this.lastViewedTracks)
    }

    saveCurrentInstrument() {
        if(global['localStorage']) {
            localStorage.setItem(this.currentInstrumentKey, this.currentInstrument)
        }
    }

    loadCurrentInstrument(): MusicalInstrument {
        return (localStorage.getItem(this.currentInstrument) || 'guitar') as MusicalInstrument
    }
}

export default GlobalStore