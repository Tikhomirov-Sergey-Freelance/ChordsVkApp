import { makeAutoObservable, observable } from 'mobx'
import { createGuid } from '../code/common/guid'
import GlobalStore from './global-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'
import { iParams as ChordParam } from './add-chords-store'

export class ChordsListStore {

    loading = false
    loaded = false

    chords: Map<string, ChordParam[]> = new Map<string, ChordParam[]>()

    constructor() {
        makeAutoObservable(this)
    }

    async loadChords() {
        
        this.loading = true

        const chords = (await getDocs(collection(GlobalStore.firestore, "chords"))).docs.map(doc => doc.data() as ChordParam)

        const chordsByGroup = new Map<string, ChordParam[]>([])

        chords.forEach(chord => {

            if(chordsByGroup.has(chord.note)) {
                chordsByGroup.get(chord.note).push(chord)
            } else {
                chordsByGroup.set(chord.note, [chord])
            }
        })
        
        this.chords = chordsByGroup 
        this.loading = false 
    }
} 

interface iChordsGroupByNote {
    note: string,
    chords: ChordParam[]
}

const store = new ChordsListStore()
export default store