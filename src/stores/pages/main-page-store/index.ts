import { makeAutoObservable, observable } from 'mobx'

import { createGuid } from '../../../code/common/guid'
import GlobalStore from '../../root/global-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'
import { snackbar } from '../../../code/common/alerts'
import { loadLastTracks } from 'code/database/tracks'
import { iChordsText, iTrack, iChordsWord, iChordWordPosition, iTrackView } from 'types/track'
import { StrummingType, defaultStrumming } from 'types/strumming'

export class MainPageStore {

    loading: boolean

    lastTracks: iTrackView[]
    favoriteTracks: string[]
    
    constructor() {

        if(!global['window']) return

        this.loadPage()

        makeAutoObservable(this, undefined, { deep: true })
    }

    async loadPage() {

        this.loading = true

        await Promise.all([
            this.loadLastTracks()
        ])

        this.loading = false
    }

    async loadLastTracks() {
        this.lastTracks = await loadLastTracks(7)
    }
}

const store = new MainPageStore()
export default store