import { makeAutoObservable, observable, toJS } from 'mobx'

import { createGuid } from '../../code/common/guid'
import { Global, Router } from 'stores/root-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc, updateDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'
import { snackbar } from '../../code/common/alerts'
import { loadAllArtists, loadArtistById, loadArtistsByIds, loadArtistsByQuery, loadShortArtistById } from 'code/database/artists'
import { iChordsText, iTrack, iChordsWord, iChordWordPosition, defaultTrack, ChordRowWord, iChordsRow } from 'types/track'
import { StrummingType, defaultStrumming } from 'types/strumming'
import { addTrack, updateTrack } from 'code/database/tracks'
import debounce from 'code/common/debounce'
import { iShortArtist } from 'types/artists'

export class ArtistListStore {

    loaded: boolean
    artists: iShortArtist[]

    constructor() {
        makeAutoObservable(this)
    }

    async loadArtists() {
        this.artists = await loadAllArtists()
        this.loaded = true
    }    
}

const store = new ArtistListStore()
export default store