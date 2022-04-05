export interface iProposeTrack {
    id: string
    userId: string
    track: string
    artist: string
    comment: string
    state: ProposeTrackType
}

export type ProposeTrackType = 'creaded' | 'canceled' | 'track-added'

export const defaultProposeTrack = {
    id: '',
    userId: '',
    track: '',
    artist: '',
    comment: '',
    state: 'created'
}