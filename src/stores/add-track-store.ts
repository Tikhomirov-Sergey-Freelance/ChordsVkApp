import { makeAutoObservable, observable } from 'mobx'

import { createGuid } from '../code/common/guid'
import GlobalStore from './global-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'
import { snackbar } from '../code/common/alerts'
import { loadArtistsByQuery } from 'code/firebase/artists'
import { iChordsText, iTrack, iChordsWord, iChordWordPosition } from 'types/track'
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
    strummingNote: string
    chordsText: iChordsText

    text: string

    artistsList: iArtistSearch[] = []
    artistListLoading = false

    constructor() {
        this.id = createGuid()
        makeAutoObservable(this, undefined, { deep: true })

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
            strumming: this.strumming,
            strummingNote: this.strummingNote,
            chordsText: this.chordsText
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

    changeText(text: string) {

        const chordsText: iChordsText = { rows: [] }
        const rows = text.split('\n')

        for (let row of rows) {
            const words = row.split(' ').filter(word => word)
            chordsText.rows.push({ words: words.map(word => ({ word })) })
        }

        for (let i = 0; i < chordsText.rows.length; i++) {

            const row = chordsText.rows[i]
            const lastRow = this.chordsText?.rows[i]

            if(!lastRow) break

            for(let j = 0; j < row.words.length; j++) {

                const word = row.words[j]
                const lastWord = lastRow.words[j]

                if(!lastWord) break

                if(word.word === lastWord.word) {
                    word.chord = lastWord.chord
                }
            }
        }

        this.text = text
        this.chordsText = chordsText
    }
}

export default AddTrackStore