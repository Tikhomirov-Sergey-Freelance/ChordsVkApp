import { makeAutoObservable, makeObservable, observable } from 'mobx'
import VK, { AppearanceType } from '@vkontakte/vk-bridge'

export class VKStore {

    validVk: boolean
    vkId: string
    appearance: AppearanceType

    constructor() {
        
        if(!global['window']) return

        this.validVk = window.validVk
        this.vkId = window.vkId

        makeAutoObservable(this)
    } 

    async initVK() {

        if(this.validVk) {

            VK.subscribe((event) => {

                if(event.detail.type === 'VKWebAppUpdateConfig') {
                    this.appearance = event.detail.data['appearance']
                }
            })

            VK.send('VKWebAppInit', {})
        }
    }
}

export default VKStore