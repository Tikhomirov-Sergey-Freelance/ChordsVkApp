import { makeAutoObservable, makeObservable, observable } from 'mobx'
import { FirebaseApp } from 'firebase/app'
import { Analytics } from 'firebase/analytics'
import initDatabase from '../code/firebase'
import { iPageKey, pages } from '../pages'
import { Database, getDatabase } from 'firebase/database'
import { Firestore } from '@firebase/firestore'
import { MusicalInstrument } from 'types/global-types'

export type iActiveStory = iPageKey | 'defaultModalPage'

export class GlobalStore {

    activeStory: iActiveStory = pages[0].key
    activePanel: string = pages[0].key
    activeModal: string
    activePanelData: any

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

        this.setLocation()

        makeObservable(this, {
            activeStory: observable,
            activePanel: observable,
            currentInstrument: observable
        })
    }   

    toMainPanel() {
        this.activePanel = this.activeStory
    }

    setActiveStory(activeStory: iActiveStory, panel: string = '', data = null) {

        this.activeStory = activeStory
        this.activePanel = panel || activeStory
        this.activePanelData = data

        this.saveLocation()
    }

    setActivePanel(panel: string = '', data = null) {

        this.activePanel = panel
        this.activePanelData = data

        this.saveLocation()
    }

    changeInstrument(instrument: MusicalInstrument) {
        this.currentInstrument = instrument
    }

    saveLocation() {
        sessionStorage.setItem('chords_location', JSON.stringify(this.locationData))
    }

    setLocation() {

        const ssLocalion = global['window'] && global['window'].sessionStorage && global['window'].sessionStorage.getItem('chords_location')

        if(!ssLocalion) return

        const location = JSON.parse(ssLocalion)

        this.activeStory = location.activeStory
        this.activePanel = location.activePanel
        this.activePanelData = location.activePanelData
    }

    get locationData() {
        return { activeStory: this.activeStory, activePanel: this.activePanel, activePanelData: this.activePanelData }
    }
}
  
var globalStore =  new GlobalStore()  
export default globalStore