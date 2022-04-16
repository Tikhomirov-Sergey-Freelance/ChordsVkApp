import { makeAutoObservable, observable } from 'mobx'
import { createGuid } from '../../code/common/guid'

export class SnackbarsStore {

    private snackbars: iShowedSnackbar[] = []
    
    get currentSnackbar(): iShowedSnackbar {
        return this.snackbars[0]
    }

    constructor() {
        makeAutoObservable(this)
    }

    snackbar(message: string, callback?: () => void) {
        return this.showSnackbar({ message, callback })
    }

    showSnackbar(snackbar: iSnackbar) {

        const id = createGuid()

        const close = () => {

            if(snackbar.callback) {
                snackbar.callback()
            }

            this.closeSnackbar(id)
        }

        const _snackbar: iShowedSnackbar = { 
            ...snackbar, 
            id,
            close
         }
         
        this.snackbars = [...this.snackbars, _snackbar]

        return _snackbar
    }

    closeSnackbar(id: string) {
        this.snackbars = this.snackbars.filter(snackbar => snackbar.id !== id)
    }
}
  
export interface iSnackbar {
    message: string
    callback?: () => void
}

export interface iShowedSnackbar extends iSnackbar {
    id: string
    close: () => void
}

export default SnackbarsStore