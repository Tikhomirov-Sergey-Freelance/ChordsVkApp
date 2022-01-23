import { StrummingType } from "./strumming";

export interface iTrack {
    id: string
    name: string
    artistId: string
    strumming: StrummingType[]
} 