import { iArtist, iShortArtist, defaultShortArtist } from 'types/artists'

export const artistToShortArtist = (artist: iArtist): iShortArtist => {

    const shortTrackKeys = Object.keys(defaultShortArtist)

    return shortTrackKeys.reduce((shortArtist: iShortArtist, key) => {

        if(artist[key]) {
            shortArtist[key] = artist[key]
        }

        return shortArtist

    }, { ...defaultShortArtist })

}

export const artistToShortArtistPartial = (artist: Partial<iArtist>): [Partial<iShortArtist>, boolean] => {

    let needSave = false

    const shortTrackKeys = Object.keys(defaultShortArtist)

    const shortArtist = shortTrackKeys.reduce((shortArtist: Partial<iShortArtist>, key) => {

        if(artist[key]) {
            needSave = true
            shortArtist[key] = artist[key]
        }

        return shortArtist

    }, {})

    return [shortArtist, needSave]
}