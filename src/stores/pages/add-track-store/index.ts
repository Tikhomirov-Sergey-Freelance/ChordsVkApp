import { makeAutoObservable, observable, toJS } from 'mobx'

import { createGuid } from '../../../code/common/guid'
import { Global, Router } from 'stores/root-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc, updateDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'
import { snackbar } from '../../../code/common/alerts'
import { loadArtistById, loadArtistsByIds, loadArtistsByQuery } from 'code/database/artists'
import { iChordsText, iTrack, iChordsWord, iChordWordPosition, defaultTrack } from 'types/track'
import { StrummingType, defaultStrumming } from 'types/strumming'
import { addTrack, updateTrack } from 'code/database/tracks'

export interface iArtistSearch {
    label: string
    value: string
}

type StoreMode = 'add' | 'edit'

export class AddTrackStore {

    mode: StoreMode

    name: string
    id: string
    artistId: string
    strumming: StrummingType[] = defaultStrumming
    strummingNote: string
    intro: string[] = []
    introNote: string
    chordsText: iChordsText
    chordsNote: string
    trackVideoSrc: string

    text: string

    artistsList: iArtistSearch[] = []
    artistListLoading = false

    constructor() {

        const routData = Router.activePanelData
        const track = routData && routData.track

        if (track) {
            this.mode = 'edit'
        } else {
            this.mode = 'add'
            this.id = createGuid()
        }

        this.fillTrack(track)

        makeAutoObservable(this, undefined, { deep: true })
        this.loadArtist = this.loadArtist.bind(this)
    }

    async save() {

        const artist = await loadArtistById(this.artistId)

        const track = this.trackToSave
        track.searchName = [artist.name.toLocaleUpperCase(), track.name.toLocaleUpperCase()]

        const result = this.mode === 'add' ?
            await addTrack(track) :
            await updateTrack(track.id, track)

        if(result) {
            snackbar(this.mode === 'add' ? 'Добавили трек' : 'Трек изменен')

            if(this.mode === 'add') {
                snackbar('Добавили трек')
                this.newTrack()
            } else {
                Router.goBack()
            }

        } else {
            snackbar('Произошла ошибка')
        }
    }

    fillTrack(track: iTrack) {

        if (this.mode === 'add') {

            if (!track) {
                return this.loadTempTrack()
            }
        }

        if (track) {
            this.fillTrackData(track)
        }
    }

    get trackToSave(): iTrack {
        return {
            id: this.id,
            name: this.name,
            index: 0,
            artistId: this.artistId,
            strumming: this.strumming,
            strummingNote: this.strummingNote || '',
            intro: this.intro || [],
            introNote: this.introNote || '',
            chordsText: toJS(this.chordsText),
            chordsNote: this.chordsNote || '',
            trackVideoSrc: this.trackVideoSrc || '',
            addedDate: new Date(),
            randomIndex: 0
        }
    }

    fillTrackData(track: iTrack) {

        if (!track) {

            if (this.mode === 'add') {
                this.newTrack()
            }

            return
        }

        this.id = track.id
        this.name = track.name
        this.artistId = track.artistId
        this.strumming = track.strumming
        this.strummingNote = track.strummingNote
        this.intro = track.intro
        this.introNote = track.introNote
        this.chordsText = track.chordsText
        this.chordsNote = track.chordsNote
        this.trackVideoSrc = track.trackVideoSrc
        this.setTextByChordsText()
    }

    changeProperty(property: keyof iTrack, value: any) {
        this[property as keyof this] = value
        this.saveTempTrack()
    }

    async loadArtist(query: string) {

        if (!query.length) return

        this.artistListLoading = true
        const data = await loadArtistsByQuery(query)

        this.artistsList = data.map(artist => ({
            label: artist.name,
            value: artist.id,
            avatar: artist.artistImage
        }))

        this.artistListLoading = false
    }

    addStrummingItem(item: StrummingType) {
        this.strumming.push(item)
        this.saveTempTrack()
    }

    deleteStrummingItem() {
        this.strumming.pop()
        this.saveTempTrack()
    }

    addIntroItem(chord: string) {

        if(!chord) return

        this.intro.push(chord)
        this.saveTempTrack()
    }

    deleteIntroItem() {
        this.intro.pop()
        this.saveTempTrack()
    }

    changeText(text: string) {
        this.text = text
        this.saveTempTrack()
    }

    changeChordText(text: string) {

        const chordsText: iChordsText = { rows: [] }
        const rows = text.split('\n')

        for (let row of rows) {

            if (!row) {
                chordsText.rows.push({ words: [], spaceRow: true })
                continue
            }

            const words = row.split(' ').filter(word => word)
            chordsText.rows.push({ words: words.map(word => ({ word })) })
        }

        for (let i = 0; i < chordsText.rows.length; i++) {

            const row = chordsText.rows[i]
            const lastRow = this.chordsText?.rows[i]

            if (!lastRow) break

            for (let j = 0; j < row.words.length; j++) {

                const word = row.words[j]
                const lastWord = lastRow.words[j]

                if (!lastWord) break

                if (word.word === lastWord.word) {
                    word.chord = lastWord.chord
                }
            }
        }

        this.chordsText = chordsText
        this.saveTempTrack()
    }

    changeChordWord(rowIndex: number, wordIndex: number, chord: iChordWordPosition) {

        this.chordsText.rows[rowIndex].words[wordIndex].chord = chord
        this.chordsText = { ...this.chordsText }
        this.saveTempTrack()
    }

    deleteChordWord(rowIndex: number, wordIndex: number) {

        this.chordsText.rows[rowIndex].words[wordIndex].chord = null
        this.chordsText = { ...this.chordsText }
        this.saveTempTrack()
    }

    newTrack() {

        this.fillTrack({ ...defaultTrack, id: createGuid() })
        this.saveTempTrack()
    }

    saveTempTrack() {

        if (this.mode === 'edit') return

        const track = [this.trackToSave, this.text]
        localStorage.setItem('tempTrack', JSON.stringify(track))
    }

    loadTempTrack() {

        const value = localStorage.getItem('tempTrack')

        if (value) {

            const [track, text] = JSON.parse(value)

            this.text = text
            this.fillTrackData(track)
        }

        return null
    }

    setTextByChordsText() {

        if (!this.chordsText?.rows) return

        const rows = this.chordsText.rows.map(row => {
            const words = row.words.map(word => word.word)
            return words.join(' ')
        })

        return rows.join('\n')
    }
}

export default AddTrackStore