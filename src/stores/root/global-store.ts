import { makeAutoObservable, makeObservable, observable } from 'mobx'
import { MusicalInstrument } from 'types/global-types'

export class GlobalStore {

    isAdmin: boolean

    currentInstrument: MusicalInstrument = 'guitar'

    constructor() {

        if(!global['window']) return

        this.isAdmin = window.isAdmin

        makeObservable(this, {
            currentInstrument: observable
        })
    }
    
    changeInstrument(instrument: MusicalInstrument) {
        this.currentInstrument = instrument
    }
}

export default GlobalStore