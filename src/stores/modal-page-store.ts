import { makeAutoObservable, makeObservable, observable } from 'mobx'
import { FirebaseApp } from 'firebase/app'
import { Analytics } from 'firebase/analytics'
import initDatabase from '../code/firebase'
import { iPageKey, pages } from '../components/navigation/menu'
import { Database, getDatabase } from 'firebase/database'
import { Firestore } from '@firebase/firestore'
import { MusicalInstrument } from 'types/global-types'
import React, { ReactNode } from 'react'
import GlobalStore from './global-store'

export interface iModalComponent {
    component: () => ReactNode
    onClose: (data: any) => void
}

export class ModalPage {
    
    activeModalComponent: iModalComponent

    constructor() {
        makeAutoObservable(this)
    }  

    openModal(component: () => ReactNode, onClose: (data) => void) {

        this.activeModalComponent = {
            component,
            onClose: (data) => {
                this.activeModalComponent = null
                onClose(data)
            }
        }
    }

    closeModal() {
        this.activeModalComponent = null
    }
}
  
var modalPage =  new ModalPage()  
export default modalPage