import { makeAutoObservable, observable } from 'mobx'

import { createGuid } from '../code/common/guid'
import GlobalStore from './global-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'
import { iParams as ChordParam } from './add-chords-store'
import { snackbar } from '../code/common/alerts'
import { loadArtistsByQuery } from 'code/firebase/artists'
import { iTrack } from 'types/track'
import { StrummingType, defaultStrumming } from 'types/strumming'

export interface iArtistSearch {
    label: string
    value: string
}

export class AddTrackStore {

    name: string
    id: string
    artistId: string
    strumming: StrummingType[] = defaultStrumming
    strummingNote

    artistsList: iArtistSearch[] = []
    artistListLoading = false

    constructor() {
        this.id = createGuid()
        makeAutoObservable(this)

        this.loadArtist = this.loadArtist.bind(this)
    }

    async save() {
        const firestore = GlobalStore.firestore

        const result = await setDoc(doc(firestore, `tracks/${this.id}`), this.trackToSave)
        console.log(result)
        
        snackbar('Добавили трек')
    }

    get trackToSave(): iTrack {
        return {
            id: this.id,
            name: this.name,
            artistId: '',
            strumming: []
        }
    }

    changeProperty(property: keyof iTrack, value: any) {
        this[property as keyof this] = value
    }

    async loadArtist(query: string) {
        
        this.artistListLoading = true 
        const data = await loadArtistsByQuery(query)
        
        this.artistsList = data.map(artist => ({
            label: artist.name,
            value: artist.id
        }))  

        this.artistListLoading = false
    }

    addStrummingItem(item: StrummingType) {
        this.strumming.push(item)
    }

    deleteStrummingItem() {
        this.strumming.pop()
    }
} 

export default AddTrackStore