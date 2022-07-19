import { makeAutoObservable } from 'mobx'
import VK, { AppearanceType } from '@vkontakte/vk-bridge'

export class VKStore {

    validVk: boolean
    vkId: string
    appearance: AppearanceType

    constructor() {

        if (!global['window']) return

        this.validVk = window.validVk
        this.vkId = window.vkId

        makeAutoObservable(this)
    }

    async bindVKEvents() {

        if (this.validVk) {

            VK.subscribe((event) => {

                if (event.detail.type === 'VKWebAppUpdateConfig') {
                    this.appearance = event.detail.data['appearance']
                }
            })
        }
    }

    async initVk() {
        VK.send('VKWebAppInit', {})
    }

    shareLink(link: string) {
        VK.send('VKWebAppShare', { link })
    }
}

export default VKStore