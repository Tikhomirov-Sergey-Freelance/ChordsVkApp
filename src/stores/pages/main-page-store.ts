import { makeAutoObservable, observable, reaction } from 'mobx'

import { createGuid } from '../../code/common/guid'
import GlobalStore from '../root/global-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'
import { snackbar } from '../../code/common/alerts'
import { loadLastAddedTracks, loadRandomTrack, loadTracksByIds } from 'code/database/tracks'
import { iChordsText, iTrack, iChordsWord, iChordWordPosition, iTrackView, iShortTrackView, iShortTrack } from 'types/track'
import { StrummingType, defaultStrumming } from 'types/strumming'
import { Global } from 'stores/root-store'
import { openTrack } from 'code/tracks/open-track'

export class MainPageStore {

    loadingTracks: boolean
    loadedTracks: boolean

    loadindRandomTrack: boolean

    lastAddedTracks: iShortTrackView[] = []
    lastViewedTracks: iShortTrackView[] = []

    openPage: boolean
    
    constructor() {

        if(!global['window']) return

        makeAutoObservable(this, undefined, { deep: true })

        this.openRandomTrack = this.openRandomTrack.bind(this)

        reaction(() => Global.lastViewedTracks, this.onChangeLastViewedTracks)
        reaction(() => this.openPage, this.onOpenPage)
    }

    async loadPage() {

        this.loadingTracks = true
        this.loadedTracks = false

        await Promise.all([
            this.loadLastAddedTracks(),
            this.loadLastViewedTracks()
        ])

        this.loadingTracks = false
        this.loadedTracks = true
    }

    async loadLastAddedTracks() {
        if(this.lastAddedTracks?.length) return
        this.lastAddedTracks = await loadLastAddedTracks(7)
    }

    async loadLastViewedTracks() {
        
        const ids = Global.lastViewedTracks
        const needLoadTracks = ids.filter(id => !this.lastViewedTracks.some(track => track.id === id))
        const lastViewedTracks = this.lastViewedTracks.filter(track => ids.some(id => track.id === id))

        lastViewedTracks.push(...(await loadTracksByIds(needLoadTracks)))

        this.lastViewedTracks = ids
            .map(id => lastViewedTracks.find(track => track.id === id))
            .filter(track => track)
    }

    async openRandomTrack() {

        this.loadindRandomTrack = true

        const randomTrack = await loadRandomTrack()
        openTrack(randomTrack.id)

        this.loadindRandomTrack = false
    }

    onChangeLastViewedTracks = () => {
        
        if (this.loadedTracks) {
            this.loadedTracks = false
        }

        if (this.openPage && !this.loadedTracks) {
            this.loadPage()
        }
    }

    onOpenPage = () => {
        
        if (this.openPage && !this.loadedTracks) {
            this.loadPage()
        }
    }

    changePageState(open: boolean) {
        this.openPage = open
    }
}

const store = new MainPageStore()
export default store