import { makeAutoObservable, makeObservable, observable } from 'mobx'
import VK, { AppearanceType } from '@vkontakte/vk-bridge'

export class VKStore {

    validVk: boolean
    appearance: AppearanceType

    constructor() {

        if(!global['window']) return

        this.validVk = window.validVk

        makeAutoObservable(this)
    } 

    async initVK() {

        if(this.validVk) {

            VK.subscribe((event) => {

                if(event.detail.type === 'VKWebAppUpdateConfig') {
                    this.appearance = event.detail.data['appearance']
                }
            })

            await VK.send('VKWebAppInit', {})
        }
    }
}

const store = new VKStore()
export default store