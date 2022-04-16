import { Snackbar } from 'stores/root-store'

export const snackbar = (message: string, callback?: () => void) => {
    return Snackbar.snackbar(message, callback)
}