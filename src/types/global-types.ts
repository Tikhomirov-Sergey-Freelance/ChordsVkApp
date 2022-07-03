declare global {
    interface Window {
        dataLayer?: unknown
    }
    interface document {
        location: unknown 
    }
}

export type MusicalInstrument = 'guitar' | 'ukulele'