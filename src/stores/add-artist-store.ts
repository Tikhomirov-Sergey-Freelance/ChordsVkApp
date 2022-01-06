import { makeAutoObservable, observable } from 'mobx'

import { createGuid } from '../code/common/guid'
import GlobalStore from './global-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'
import { iParams as ChordParam } from './add-chords-store'
import { snackbar } from '../code/common/alerts'

export interface iArtist {
    id: string,
    name: string
}

export class AddArtistStore {

    name: string
    id: string

    constructor() {
        this.id = createGuid()
        makeAutoObservable(this)
    }

    async save() {
        const firestore = GlobalStore.firestore

        const result = await setDoc(doc(firestore, `artists/${this.id}`), this.artistToSave)
        console.log(result)
        
        snackbar('Добавили артиста')
    }

    get artistToSave(): iArtist {
        return {
            id: this.id,
            name: this.name
        }
    }

    changeProperty(property: keyof iArtist, value: any) {
        this[property as keyof this] = value
    }
} 

export default AddArtistStore