import { makeAutoObservable, observable, toJS } from 'mobx'

import { createGuid } from '../../../code/common/guid'
import { Global, Router } from 'stores/root-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc, updateDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'
import { snackbar } from '../../../code/common/alerts'
import { loadArtistById, loadArtistsByIds, loadArtistsByQuery, loadShortArtistById } from 'code/database/artists'
import { iChordsText, iTrack, iChordsWord, iChordWordPosition, defaultTrack, ChordRowWord } from 'types/track'
import { StrummingType, defaultStrumming } from 'types/strumming'
import { addTrack, updateTrack } from 'code/database/tracks'
import debounce from 'code/common/debounce'
import { iShortArtist } from 'types/artists'
import { iTrackCandidate, iTrackCandidatesView as iTrackCandidateView } from 'types/track-candidate'
import { openTrack } from 'code/tracks/open-track'
import { changeTrackCandidateState } from 'code/database/track-candidates'

export interface iArtistSearch {
    label: string
    value: string
    avatar: string
}

type StoreMode = 'add' | 'edit' | 'from-track-candidate'

export class AddTrackStore {

    mode: StoreMode

    name: string
    id: string
    artistId: string
    riff: string
    riffNote: string
    strumming: StrummingType[] = defaultStrumming
    strummingNote: string
    intro: string[] = []
    introNote: string
    outro: string[] = []
    outroNote: string
    chordsText: iChordsText
    chordsNote: string
    trackVideoSrc: string

    text: string

    currentArtist: iShortArtist
    artistsList: iArtistSearch[] = []
    artistListLoading = false

    constructor() {

        const routeData = Router.activePanelData

        this.fillTrack(routeData)

        makeAutoObservable(this, undefined, { deep: true })
        this.searchArtist = this.searchArtist.bind(this)
    }

    async save() {

        const track = this.prepareTrackToSave()

        const result = this.mode === 'edit' ?
            await updateTrack(track.id, track) :
            await addTrack(track)

        if(result) {

            if(this.mode === 'from-track-candidate') {
                const trackCandidate: iTrackCandidate = Router.activePanelData.trackCandidate
                await changeTrackCandidateState(trackCandidate.id, 'added')
            }

            snackbar(this.mode === 'edit' ?  'Трек изменен' : 'Добавили трек')

            if(this.mode === 'add') {
                this.newTrack()
            } 

            if(this.mode === 'edit') {
                Router.goBack()
            }

            if(this.mode === 'from-track-candidate') {
                openTrack(this.id)
            }

        } else {
            snackbar('Произошла ошибка')
        }
    }

    fillTrack(routeData) {

        this.mode = this.getMode(routeData)

        if (this.mode === 'add') {
            this.id = createGuid()
            this.loadTempTrack()
        }

        if(this.mode === 'edit') {
            const track = routeData && routeData.track
            this.fillTrackData(track)
        }

        if(this.mode === 'from-track-candidate') {
            const trackCandidate = routeData && routeData.trackCandidate
            this.fillTrackFromCandidate(trackCandidate)
        }
    }

    prepareTrackToSave(): iTrack {

        const track: iTrack = {
            id: this.id,
            name: this.name,
            index: 0,
            artistId: this.artistId,
            riff: this.riff || '',
            riffNote: this.riffNote || '',
            strumming: this.strumming,
            strummingNote: this.strummingNote || '',
            intro: this.intro || [],
            introNote: this.introNote || '',
            outro: this.outro || [],
            outroNote: this.outroNote || '',
            chordsText: toJS(this.chordsText),
            chordsNote: this.chordsNote || '',
            trackVideoSrc: this.trackVideoSrc || '',
            addedDate: new Date()
        }

        track.chordsText.rows = track.chordsText.rows.map(row => {

            if(row.words) {

                row.words = row.words.map(word => {

                    if(typeof word === 'string') return word

                    if(!word.chord || !word.chord.key) return word.word

                    if(!word.chord.pos) {
                        word.chord.pos = 0
                    }

                    return word
                })
            }

            if(row.instrumental) {
                if(!row.instrumental.chords?.length && !row.instrumental.note) {
                    return { space: true }
                }
            }

            return row
        })

        return track
    }

    fillTrackData(track: iTrack) {

        track = { ...defaultTrack, ...(track || {}) }

        this.id = track.id || createGuid()
        this.name = track.name
        this.artistId = track.artistId
        this.strumming = track.strumming
        this.strummingNote = track.strummingNote
        this.intro = track.intro
        this.introNote = track.introNote
        this.chordsText = track.chordsText
        this.chordsNote = track.chordsNote
        this.trackVideoSrc = track.trackVideoSrc

        this.fillArtistData(track)
        this.setTextByChordsText()
    }

    fillTrackFromCandidate(trackCandidate: iTrackCandidateView) {

        const track: iTrack = { ...defaultTrack, ...(trackCandidate || {}), chordsText: trackCandidate.chordText }

        track.artistId = trackCandidate.foundArtist?.id || ''

        this.id = createGuid()
        this.name = track.name
        this.artistId = track.artistId 
        this.strumming = track.strumming
        this.strummingNote = track.strummingNote
        this.intro = track.intro
        this.introNote = track.introNote
        this.chordsText = track.chordsText
        this.chordsNote = track.chordsNote
        this.trackVideoSrc = track.trackVideoSrc

        this.fillArtistData(track)
        this.setTextByChordsText()
    }

    getMode(routeData): StoreMode {

        const track = routeData && routeData.track
        const trackCandidate = routeData && routeData.trackCandidate

        if(track) {
            return 'edit'
        }

        if(trackCandidate) {
            return 'from-track-candidate'
        }

        return 'add'
    }

    changeProperty(property: keyof iTrack, value: any) {
        this[property as keyof this] = value
        this.saveTempTrack()
    }

    async changeArtist(artistId: string) {
        this.artistId = artistId

        if(artistId) {
            this.currentArtist = await loadShortArtistById(artistId)
        }
    }

    async fillArtistData(track: iTrack) {

        if(!track.artistId) return 
        this.currentArtist = await loadShortArtistById(track.artistId)

        if(this.currentArtist) {
            this.artistsList = [this.artistToSearchArtist(this.currentArtist)]
        }
    }

    async searchArtist(query: string) {

        if (!query.length) {

            if(this.currentArtist) {
                this.artistsList = [this.artistToSearchArtist(this.currentArtist)]
            }
        }

        this.artistListLoading = true
        const data = await loadArtistsByQuery(query)

        this.artistsList = data.map(artist => this.artistToSearchArtist(artist))

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

    addIntroItem(chord: string, mode: 'intro' | 'outro' = 'intro') {
    
        if(!chord) return

        if(mode === 'intro') {
            this.intro.push(chord)
        } else {
            this.outro.push(chord)
        }

        this.saveTempTrack()
    }

    deleteIntroItem(mode: 'intro' | 'outro' = 'intro') {

        if(mode === 'intro') {
            this.intro.pop()
        } else {
            this.outro.pop()
        }
        
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
                chordsText.rows.push({ space: true })
                continue
            }

            const words = row.split(' ').filter(word => word)
            chordsText.rows.push({ words: words.map(word => (word)) })
        }

        for (let i = 0; i < chordsText.rows.length; i++) {

            const row = chordsText.rows[i]
            const lastRow = this.chordsText?.rows[i]

            if (!lastRow) break

            if(lastRow.space || lastRow.instrumental) {
                chordsText.rows.splice(i, 0, lastRow)
                continue
            }

            if(!row.words || !lastRow.words) continue

            for (let j = 0; j < row.words.length; j++) {

                let word = row.words[j]
                let lastWord = lastRow.words[j]

                if (!lastWord || !word) break

                if(typeof lastWord === 'string') continue

                word = this.getWordFromWordChord(word)
                lastWord.word

                if (word === lastWord.word) {
                    row.words[j] = { word: word, chord: lastWord.chord }
                }
            }
        }

        this.chordsText = chordsText
        this.saveTempTrack()
    }

    changeChordWord(rowIndex: number, wordIndex: number, chord: iChordWordPosition) {

        let word = this.getWordFromWordChord(this.chordsText.rows[rowIndex].words[wordIndex])

        if(chord.key) {
            this.chordsText.rows[rowIndex].words[wordIndex] = { word: word, chord }
        } else {
            this.chordsText.rows[rowIndex].words[wordIndex] = word
        }

        this.chordsText = { ...this.chordsText }
        this.saveTempTrack()
    }

    deleteChordWord(rowIndex: number, wordIndex: number) {

        let word = this.getWordFromWordChord(this.chordsText.rows[rowIndex].words[wordIndex])

        this.chordsText.rows[rowIndex].words[wordIndex] = word
        this.chordsText = { ...this.chordsText }
        this.saveTempTrack()
    }

    addInstrumentalRow(rowIndex: number) {

        this.chordsText.rows.splice(rowIndex, 0, { instrumental: { chords: [] } })

        this.chordsText = { ...this.chordsText }
        this.saveTempTrack()
    }

    addInctrumentalChord(rowIndex: number, chord: string) {

        if(!chord) return 

        if(!this.chordsText.rows[rowIndex].instrumental.chords) {
            this.chordsText.rows[rowIndex].instrumental.chords = []
        }

        this.chordsText.rows[rowIndex].instrumental.chords.push(chord)

        this.chordsText = { ...this.chordsText }
        this.saveTempTrack()
    }

    deleteInstrumentalChord(rowIndex: number) {

        const chords = this.chordsText.rows[rowIndex].instrumental.chords

        if(!chords || !chords.length) {
            this.chordsText.rows.splice(rowIndex, 1)
        } else {
            chords.pop()
        }

        this.chordsText = { ...this.chordsText }
        this.saveTempTrack()
    }

    addInstrumentalNote(rowIndex: number, note: string) {

        this.chordsText.rows[rowIndex].instrumental.note = note || ''

        this.chordsText = { ...this.chordsText }
        this.saveTempTrack()
    }

    artistToSearchArtist(artist: iShortArtist): iArtistSearch {
        return {
            label: artist.name,
            value: artist.id,
            avatar: artist.artistImage
        }
    }

    newTrack() {

        this.fillTrack({ ...defaultTrack, id: createGuid() })
        this.saveTempTrack()
    }

    saveTempTrack = debounce(this._saveTempTrack, 300)[0]
    _saveTempTrack() {

        if (this.mode !== 'add') return

        const track = [this.prepareTrackToSave(), this.text]
        localStorage.setItem('tempTrack', JSON.stringify(track))
    }

    loadTempTrack() {

        const value = localStorage.getItem('tempTrack')

        if (value) {

            let [track, text] = JSON.parse(value)

            this.text = text
            this.fillTrackData(track)
        }

        return null
    }

    setTextByChordsText() {
        
        if (!this.chordsText?.rows) return

        const rows = this.chordsText.rows.map(row => {

            if(row.space || !row.words) {
                return ''
            } 

            const words = row.words.map(word => this.getWordFromWordChord(word))
            return words.join(' ')
        })

        this.text = rows.join('\n')
    }

    getWordFromWordChord(word: ChordRowWord) {
        return typeof word === 'string' ? word : word.word
    }
}

export default AddTrackStore