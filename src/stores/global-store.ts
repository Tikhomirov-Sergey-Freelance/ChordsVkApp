import { makeAutoObservable } from 'mobx'
import { iPageKey, pages } from '../pages'

export class GlobalStore {

    activeStory: iPageKey = pages[0].key
    activePanel: string = pages[0].key

    constructor() {
        makeAutoObservable(this)
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
}
  
const store = (window as any).store = new GlobalStore()
export default store