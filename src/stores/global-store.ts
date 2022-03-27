import { makeAutoObservable, makeObservable, observable } from 'mobx'
import FirebaseProvider from '../code/firebase'
import pages, { iPageKey } from '../components/navigation/menu'
import { MusicalInstrument } from 'types/global-types'
import VK, { VKBridgeEvent, AnyReceiveMethodName } from '@vkontakte/vk-bridge'
import ModalStore from './modal-page-store'
import RouterStore from './router-store'
import VKStore from './vk-store'

export type iActiveStory = iPageKey | 'defaultModalPage'

export class GlobalStore {

    globalLoading = true

    router = RouterStore
    modal = ModalStore
    vk = VKStore

    firebase: FirebaseProvider

    firebaseToken: string
    isAdmin: boolean

    currentInstrument: MusicalInstrument = 'guitar'

    constructor() {

        if(!global['window']) return

        this.globalLoading = true

        const firebaseToken = window.firebaseToken
        this.isAdmin = window.isAdmin

        this.firebase = new FirebaseProvider(firebaseToken)

        makeObservable(this, {
            currentInstrument: observable
        })
    }

    async loadApp() {

        //тут что-нибудь, что нужно загрузить

        await this.vk.initVK()

        this.globalLoading = false
    }  
    
    changeInstrument(instrument: MusicalInstrument) {
        this.currentInstrument = instrument
    }
}

var globalStore = new GlobalStore()

if(global['window']) {
    global['window']['globalStore'] = globalStore
}

export default globalStore