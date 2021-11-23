import SnackbarsStore, { iSnackbar } from '../../stores/snackbar'

export const snackbar = (message: string, callback?: () => void) => {
    return SnackbarsStore.showSnackbar({ message, callback })
}