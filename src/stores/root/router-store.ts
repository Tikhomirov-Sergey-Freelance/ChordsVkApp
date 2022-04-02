import { makeAutoObservable, makeObservable, observable, toJS } from 'mobx'
import pages, { iPageKey } from '../../components/navigation/menu'
import { Modal } from '../root-store'

export interface iHistoryData {
    activeStory: iActiveStory
    activePanel: string
    activePanelData: any

    modalKey?: string
    modalData?: any
}

export type iActiveStory = iPageKey

export class RouterStore {

    activeStory: iActiveStory = 'tracks'
    activePanel: string = 'tracks'
    activePanelData: any

    constructor() {

        if (!global['window']) return

        this.setLocation()
        this.bindEvents()

        makeAutoObservable(this)
    }

    toMainPanel() {
        this.activePanel = this.activeStory
    }

    goBack() {
        history.back()
    }

    pushHistory() {

        const data: iHistoryData = toJS(this.locationData)
        const modalData = toJS(Modal.activeModalComponent)

        if (modalData) {
            data.modalKey = toJS(modalData.key)
            data.modalData = toJS(modalData.modalData.data)
        }

        history.pushState(toJS(data), null)
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

    saveLocation() {
        sessionStorage.setItem('chords_location', JSON.stringify(this.locationData))
    }

    setLocation() {

        try {

            let ssLocation = global['window'] && global['window'].sessionStorage && global['window'].sessionStorage.getItem('chords_location')

            if (ssLocation) {

                const location = JSON.parse(ssLocation)

                this.activeStory = location.activeStory
                this.activePanel = location.activePanel
                this.activePanelData = location.activePanelData
            }

            const data: iHistoryData = { ...toJS(this.locationData) }
            history.replaceState(data, null)
        }
        catch {

        }
    }

    bindEvents() {

        window.addEventListener('popstate', (event) => {

            const state: iHistoryData = event.state

            if (state) {

                if (this.activeStory !== state.activeStory) {
                    this.activeStory = state.activeStory
                }

                if (this.activePanel !== state.activePanel) {
                    this.activePanel = state.activePanel
                }

                this.activePanelData = state.activePanelData

                Modal.openFromHistory(state.modalKey, state.modalData)
            }
        })
    }

    get locationData() {
        return { activeStory: toJS(this.activeStory), activePanel: toJS(this.activePanel), activePanelData: toJS(this.activePanelData) }
    }
}

export default RouterStore