import SnackbarsStore, { iSnackbar } from '../../stores/root/snackbar-store'

export const snackbar = (message: string, callback?: () => void) => {
    return SnackbarsStore.showSnackbar({ message, callback })
}