import { makeAutoObservable, makeObservable, observable } from 'mobx'
import { FirebaseApp } from 'firebase/app'
import { Analytics } from 'firebase/analytics'
import initDatabase from '../code/firebase'
import { iPageKey, pages } from '../pages'
import { Database, getDatabase } from 'firebase/database'
import { Firestore } from '@firebase/firestore'
import { MusicalInstrument } from 'types/global-types'

export class GlobalStore {

    activeStory: iPageKey = pages[0].key
    activePanel: string = pages[0].key

    firebase: FirebaseApp
    database: Database
    firestore: Firestore
    firebaseAnalitics: Analytics

    adminToken: string
    validVk: boolean

    currentInstrument: MusicalInstrument = 'guitar'

    constructor() {

        const { app, database, firestore, analytics } = initDatabase()

        this.firebase = app
        this.database = database
        this.firestore = firestore

        //this.firebaseAnalitics = analytics

        this.adminToken = global['window'] && global['window'].adminToken
        this.validVk = global['window'] && global['window'].validVk

        makeObservable(this, {
            activeStory: observable,
            activePanel: observable,
            currentInstrument: observable
        })
    }   

    toMainPanel() {
        this.activePanel = this.activeStory
    }

    setActiveStory(activeStory: iPageKey, panel: string = '') {
        this.activeStory = activeStory
        this.activePanel = panel || activeStory
    }

    setActivePanel(panel: string = '') {
        this.activePanel = panel
    }

    changeInstrument(instrument: MusicalInstrument) {
        this.currentInstrument = instrument
    }
}
  
var globalStore =  new GlobalStore()  
export default globalStore