import { makeAutoObservable, observable } from 'mobx'

import { createGuid } from '../../code/common/guid'
import GlobalStore from '../global-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'
import { snackbar } from '../../code/common/alerts'
import { loadLastTracks } from 'code/firebase/tracks'
import { iChordsText, iTrack, iChordsWord, iChordWordPosition, iTrackView } from 'types/track'
import { StrummingType, defaultStrumming } from 'types/strumming'

export class MainPageStore {

    loadingLastTracks: boolean

    lastTracks: iTrackView[]
    FavoriteTracks: iTrackView[]
    
    constructor() {
        makeAutoObservable(this, undefined, { deep: true })
    }

    async loadLastTracks() {

        this.loadingLastTracks = true

        this.lastTracks = await loadLastTracks(5)

        this.loadingLastTracks = false
    }
}

export default MainPageStore