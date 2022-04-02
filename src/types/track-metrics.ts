export interface iTrackMetrics {
    id: string
    views: number
    inFavorites?: number
}

export interface iAllTracksInfo {
    count: number
    nextRandomIndex: number
}

export const defaultTracksInfo: iAllTracksInfo = {
    count: 0,
    nextRandomIndex: 0
}