import { Firebase } from 'stores/root-store'
import { iShortArtist } from 'types/artists'
import { iShortTrack, iShortTrackView } from 'types/track'
import { loadArtistByTags } from './artists'
import { loadTracksByQuery } from './tracks'

export const searchByQuery = async (query: string): Promise<[iShortArtist[], iShortTrackView[]]> => {

    if(!query) return [[], []]

    const words = query.toLocaleUpperCase()
        .replace('-', '')
        .split(' ')
        .filter(word => word)
        .join(' ')
    
    if(!words.length) return [[], []]

    return await Promise.all([loadArtistByTags(words), loadTracksByQuery(words)])
}

