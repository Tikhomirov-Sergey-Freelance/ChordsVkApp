import { makeAutoObservable, makeObservable, observable } from 'mobx'
import FirebaseProvider from '../code/firebase'
import pages, { iPageKey } from '../components/navigation/menu'
import { MusicalInstrument } from 'types/global-types'
import VK from '@vkontakte/vk-bridge'
import ModalPage from './modal-page-store'

export type iActiveStory = iPageKey | 'defaultModalPage'

export class GlobalStore {

    globalLoading = true

    activeStory: iActiveStory = 'tracks'
    activePanel: string = 'tracks'
    activePanelData: any

    firebase: FirebaseProvider

    firebaseToken: string
    validVk: boolean
    isAdmin: boolean

    currentInstrument: MusicalInstrument = 'guitar'

    constructor() {

        this.globalLoading = true

        const firebaseToken = global['window'] && global['window'].firebaseToken
        this.validVk = global['window'] && global['window'].validVk
        this.isAdmin = global['window'] && global['window'].isAdmin

        this.firebase = new FirebaseProvider(firebaseToken)

        if(!global['window']) return

        this.loadApp()

        this.setLocation()
        this.bindEvents()

        makeObservable(this, {
            activeStory: observable,
            activePanel: observable,
            currentInstrument: observable
        })
    }

    async loadApp() {

        //тут что-нибудь, что нужно загрузить

        await VK.send("VKWebAppInit", {})
        this.globalLoading = false
    }

    toMainPanel() {
        this.activePanel = this.activeStory
    }

    pushHistory() {
        history.pushState(this.locationData, null)
    }

    setActiveStory(activeStory: iActiveStory, panel: string = '', data = null) {

        this.activeStory = activeStory
        this.activePanel = panel || activeStory
        this.activePanelData = data

        this.pushHistory()
        this.saveLocation()
    }

    setActivePanel(panel: string = '', data = null) {

        this.activePanel = panel
        this.activePanelData = data

        this.pushHistory()
        this.saveLocation()
    }

    changeInstrument(instrument: MusicalInstrument) {
        this.currentInstrument = instrument
    }

    saveLocation() {
        sessionStorage.setItem('chords_location', JSON.stringify(this.locationData))
    }

    setLocation() {

        try {

            const ssLocalion = global['window'] && global['window'].sessionStorage && global['window'].sessionStorage.getItem('chords_location')

            if (!ssLocalion) return

            const location = JSON.parse(ssLocalion)

            this.activeStory = location.activeStory
            this.activePanel = location.activePanel
            this.activePanelData = location.activePanelData

            this.pushHistory()
        }
        catch {

        }
    }

    bindEvents() {
        
        window.addEventListener('popstate', (event) => {
            
            const state = event.state

            if(state) {

                if(this.activeStory !== state.activeStory) {
                    this.activeStory = state.activeStory
                }

                if(this.activePanel !== state.activePanel) {
                    this.activePanel = state.activePanel
                }

                this.activePanelData = state.activePanelData
            }
        })
    }

    get locationData() {
        return { activeStory: this.activeStory, activePanel: this.activePanel, activePanelData: this.activePanelData }
    }
}

var globalStore = new GlobalStore()

if(global['window']) {
    global['window']['globalStore'] = globalStore
}

export default globalStore