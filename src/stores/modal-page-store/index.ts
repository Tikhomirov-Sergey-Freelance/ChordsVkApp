import { makeAutoObservable, makeObservable, observable } from 'mobx'
import React, { ReactNode } from 'react'
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
}

export class ModalPage {
    
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
    }

    closeModal(data = null) {
        
        if(this.activeModalComponent?.modalData.onClose) {
            this.activeModalComponent.modalData.onClose(data)
        }

        this.activeModalComponent = null
    }
}
  
var modalPage =  new ModalPage()  
export default modalPage