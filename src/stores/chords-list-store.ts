import { makeAutoObservable, observable } from 'mobx'
import { createGuid } from '../code/common/guid'
import GlobalStore from './global-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'
import { iParams as ChordParam } from './add-chords-store'

export class ChordsListStore {

    loading = false
    loaded = false

    guitarChords: Map<string, ChordParam[]> = new Map<string, ChordParam[]>()
    ukuleleChords: Map<string, ChordParam[]> = new Map<string, ChordParam[]>()

    constructor() {
        makeAutoObservable(this)
    }

    async loadChords() {

        if(this.loaded) return
        
        this.loading = true

        const chords = (await getDocs(collection(GlobalStore.firestore, "chords"))).docs.map(doc => doc.data() as ChordParam)

        const guitarChordsByGroup = new Map<string, ChordParam[]>([])
        const ukuleleChordsByGroup = new Map<string, ChordParam[]>([])

        this.guitarChords = null 
        this.ukuleleChords = null

        chords.forEach(chord => {

            const source = chord.instrument === 'guitar' ? guitarChordsByGroup : ukuleleChordsByGroup

            if(source.has(chord.note)) {
                source.get(chord.note).push(chord)
            } else {
                source.set(chord.note, [chord])
            }
        })
        
        this.guitarChords = guitarChordsByGroup 
        this.ukuleleChords = ukuleleChordsByGroup

        this.loaded = true
        this.loading = false 
    }
} 

const store = new ChordsListStore()
export default store