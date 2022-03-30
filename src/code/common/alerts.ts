import SnackbarsStore, { iSnackbar } from '../../stores/root/snackbar'

export const snackbar = (message: string, callback?: () => void) => {
    return SnackbarsStore.showSnackbar({ message, callback })
}