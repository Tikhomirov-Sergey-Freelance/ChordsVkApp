import { iTrack, iShortTrack, defaultShortTrack } from 'types/track'

export const trackToShortTrack = (track: iTrack): iShortTrack => {

    const shortTrackKeys = Object.keys(defaultShortTrack)

    return shortTrackKeys.reduce((shortTrack: iShortTrack, key) => {

        if(track[key]) {
            shortTrack[key] = track[key]
        }

        return shortTrack

    }, { ...defaultShortTrack })
}

export const trackToShortTrackPartial = (track: Partial<iTrack>): [Partial<iShortTrack>, boolean] => {

    let needSave = false

    const shortTrackKeys = Object.keys(defaultShortTrack)

    const shortTrack = shortTrackKeys.reduce((shortTrack: Partial<iShortTrack>, key) => {

        if(track[key]) {
            needSave = true
            shortTrack[key] = track[key]
        }

        return shortTrack

    }, {})

    return [shortTrack, needSave]
}