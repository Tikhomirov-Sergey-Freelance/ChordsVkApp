export type iAppearance = 'light' | 'dark'

export interface iUserFavorite {
    id: string
    tracks: string[]
}

export type iResult<T> = {
    error?: string | unknown,
    result?: T
}