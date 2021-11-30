declare global {
    interface Window {
        dataLayer?: any
    }
    interface document {

    }
}

export type MusicalInstrument = 'guitar' | 'ukulele'