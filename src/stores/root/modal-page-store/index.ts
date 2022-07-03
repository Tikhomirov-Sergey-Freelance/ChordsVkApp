import { makeAutoObservable } from 'mobx'
import { ReactNode } from 'react'
import { Router } from '../../root-store'

export type ModalKey = 'defaultModalPage'

export interface ModalComponent {
    key: ModalKey
    modalData: ModalComponentData 
}

export interface ModalComponentData {
    header?: () => ReactNode
    component?: () => ReactNode
    data?: unknown
    onClose?: (data?: unknown) => void

    store?: unknown
    saveHistory?: boolean
    openFromHistory?: boolean
}

export class ModalPageStore {
    
    activeModalComponent: ModalComponent

    constructor() {
        makeAutoObservable(this)
        this.closeModal = this.closeModal.bind(this)
    }  

    get active() {
        return !!this.activeModalComponent
    }

    openModal(key: ModalKey, modalData: ModalComponentData = {}) {
        
        const store = modalData.store
        modalData.store = store
        
        this.activeModalComponent = {
            key,
            modalData
        }

        if(modalData.saveHistory && !modalData.openFromHistory) {
            Router.pushHistory()
        }
    }

    closeModal(data = null) {
        
        if(this.activeModalComponent?.modalData?.onClose) {
            this.activeModalComponent.modalData.onClose(data)
        }

        this.activeModalComponent.key = null

        setTimeout(() => {
            this.activeModalComponent = null
        }, 0)
    }

    openFromHistory(key: string, data: unknown) {

        if(key) {
            this.openModal(key as ModalKey, { data, saveHistory: true, openFromHistory: true })
        } else {
            this.activeModalComponent = null
        }
    }
}
   
export default ModalPageStore