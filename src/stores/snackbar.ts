import { makeAutoObservable, observable } from 'mobx'
import { createGuid } from '../code/common/guid'

export class SnackbarsStore {

    private snackbars: iShowedSnackbar[] = []
    
    get currentSnackbar(): iShowedSnackbar {
        return this.snackbars[0]
    }

    constructor() {
        makeAutoObservable(this)
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

const store = (window as any).SnackbarsStore = new SnackbarsStore()
export default store