import GlobalStore from './root/global-store'
import RouterStore from './root/router-store'
import FirebaseStore from './root/firebase-store'
import VkStore from './root/vk-store'
import ModalStore from './root/modal-page-store'
import FavoritesStore from './root/favorites-store'
import SnackbarStore from './root/snackbar-store'

export class RootStore {

    GlobalStore = new GlobalStore()
    RouterStore = new RouterStore()
    FirebaseStore = new FirebaseStore()
    VkStore = new VkStore()
    ModalStore = new ModalStore()
    FavoritesStore = new FavoritesStore()
    SnackbarStore = new SnackbarStore()

    async loadApp() {

        //тут что-нибудь, что нужно загрузить

        await this.VkStore.bindVKEvents()
        this.RouterStore.checkHash()

        this.FavoritesStore.loadFavorites()
    }
}

export const Root = new RootStore()

export const Global = Root.GlobalStore
export const Router = Root.RouterStore
export const Firebase = Root.FirebaseStore
export const VK = Root.VkStore
export const Modal = Root.ModalStore
export const Favorites = Root.FavoritesStore
export const Snackbar = Root.SnackbarStore

if(global['window'] && location.host === 'localhost') {
    global['window']['RootStore'] = Root
}
