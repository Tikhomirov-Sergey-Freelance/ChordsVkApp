const localStorageLastTracksKey = 'lastviewedtracks'

export const saveLastTrackToLocalStorage = (lastTracks: string[]) => {
    localStorage.setItem(localStorageLastTracksKey, JSON.stringify(lastTracks))
}

export const getLastTracksFromLocalStorage = () => {

    const lastTracksJson = localStorage.getItem(localStorageLastTracksKey)
    let lastTracks: string[] = []

    if(lastTracksJson) {
        lastTracks = JSON.parse(lastTracksJson)
    }

    if(Array.isArray(lastTracks)) {
        return lastTracks
    }

    return []
}