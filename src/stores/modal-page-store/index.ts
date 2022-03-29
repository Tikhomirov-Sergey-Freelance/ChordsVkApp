import { makeAutoObservable, makeObservable, observable } from 'mobx'
import React, { ReactNode } from 'react'
import GlobalStore from 'stores/global-store'
import { createStoreByModalKey } from './dictionary'

export type ModalKey = 'defaultModalPage' | 'track' | 'artist'

export interface ModalComponent {
    key: ModalKey
    modalData: ModalComponentData 
}

export interface ModalComponentData {
    header?: () => ReactNode
    component?: () => ReactNode
    data?: any
    onClose?: (data?: any) => void

    store?: any
    saveHistory?: boolean
    openFromHistory?: boolean
}

export class ModalPageStore {
    
    activeModalComponent: ModalComponent

    constructor() {
        makeAutoObservable(this)
    }  

    openModal(key: ModalKey, modalData: ModalComponentData = {}) {
        
        const store = modalData.store || createStoreByModalKey(key, modalData.data)
        modalData.store = store
        
        this.activeModalComponent = {
            key,
            modalData
        }

        if(modalData.saveHistory && !modalData.openFromHistory) {
            GlobalStore.router.pushHistory()
        }
    }

    closeModal(data = null) {
        
        if(this.activeModalComponent?.modalData.onClose) {
            this.activeModalComponent.modalData.onClose(data)
        }

        this.activeModalComponent = null
    }

    openFromHistory(key: string, data: any) {

        if(key) {
            this.openModal(key as ModalKey, { data, saveHistory: true, openFromHistory: true })
        } else {
            this.activeModalComponent = null
        }
    }
}
   
export default ModalPageStore