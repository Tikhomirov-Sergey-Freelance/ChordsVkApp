import { makeAutoObservable, observable } from 'mobx'

import { createGuid } from '../../code/common/guid'
import GlobalStore from '../global-store'
import { collection, addDoc, getDocs, query, getDoc, collectionGroup, doc, setDoc } from '@firebase/firestore'
import { limit } from 'firebase/firestore'

import { snackbar } from '../../code/common/alerts'
import { iArtist } from 'types/artists'
import { saveArtistLogo } from 'code/firebase/images'
import { saveArtist } from 'code/firebase/artists'

export class AddArtistStore {

    name: string
    id: string
    imageData: File
    imageDataSrc: any
    artistImage: string

    description: string

    queryArtist

    constructor() {
        this.id = createGuid()
        makeAutoObservable(this)
    }

    async save() {
        const firestore = await GlobalStore.firebase.getFirestore()

        const artist = this.artistToSave
        await this.saveLogo(artist)
        
        const result = await saveArtist(artist)
        console.log(result)
        
        snackbar('Добавили артиста')
    }

    get artistToSave(): iArtist {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            artistImage: '',
            searchName: this.name.toUpperCase()
        }
    }

    changeProperty(property: keyof iArtist, value: any) {
        this[property as keyof this] = value
    }

    changeImage(file: File) {

        this.imageData = file

        const fileReader = new FileReader()
        fileReader.onload = () => {
            this.imageDataSrc = fileReader.result
        }
        fileReader.readAsDataURL(this.imageData)
    }

    async saveLogo(artist: iArtist) {
        
        if(!this.imageData) return 

        const logo = await saveArtistLogo(artist.id, this.imageData)

        if(!logo) {
            snackbar('Ошибка при сохранении логотипа.')
            return
        } 

        this.artistImage = logo
        artist.artistImage = logo
    }
} 

export default AddArtistStore