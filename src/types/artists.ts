export interface iShortArtist {
    id: string
    name: string
    artistImage: string

    searchName: string
}

export interface iArtist {
    id: string
    name: string
    
    description: string
    artistImage: string

    searchName: string
}

export interface iArtistTag {
    id: string
    artistId: string
    tag: string
    strict?: boolean
}

export const defaultArtist: iArtist = {
    id: '',
    name: '',
    
    description: '',
    artistImage: '',

    searchName: ''
}

export const defaultShortArtist: iShortArtist = {
    id: '',
    name: '',
    
    artistImage: '',

    searchName: ''
}