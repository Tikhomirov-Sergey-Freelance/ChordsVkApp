import { makeAutoObservable } from 'mobx'
import VK, { AppearanceType } from '@vkontakte/vk-bridge'
import { getTrackLink } from 'code/tracks/track-link'

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

    async bindVKEvents() {

        if(this.validVk) {

            VK.subscribe((event) => {

                if(event.detail.type === 'VKWebAppUpdateConfig') {
                    this.appearance = event.detail.data['appearance']
                }
            })
        }
    }

    async initVk() {

        VK.send('VKWebAppInit', {})
        window['VK'].init({ apiId: 8012795, onlyWidgets: true })
    }

    mountComments(objectId: string) {
        window['VK'].Widgets.Comments('vk_comments', 
        { limit: 10, pageUrl: getTrackLink(objectId) }, 
        objectId)
    }

    shareLink(link: string) {
        VK.send('VKWebAppShare', { link })
    }
}

export default VKStore