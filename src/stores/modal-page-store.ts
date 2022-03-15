import { makeAutoObservable, makeObservable, observable } from 'mobx'
import React, { ReactNode } from 'react'
import GlobalStore from './global-store'

export interface iModalComponent {
    header?: () => ReactNode
    component: () => ReactNode
    onClose: (data: any) => void
}

export class ModalPage {
    
    activeModalComponent: iModalComponent

    constructor() {
        makeAutoObservable(this)
    }  

    openModal(component: () => ReactNode, onClose: (data) => void, header?: () => ReactNode) {

        this.activeModalComponent = {
            component,
            onClose: (data) => {
                this.activeModalComponent = null

                if(onClose) {
                    onClose(data)
                }
            },
            header
        }
    }

    closeModal() {
        
        if(this.activeModalComponent?.onClose) {
            this.activeModalComponent.onClose(null)
        }

        this.activeModalComponent = null
    }
}
  
var modalPage =  new ModalPage()  
export default modalPage