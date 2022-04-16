import React from 'react'
import { observer } from 'mobx-react-lite'

import { Modal, Snackbar as SnackbarStore } from 'stores/root-store'
import { SizeType, Snackbar } from '@vkontakte/vkui'

export interface iProps {
  place?: 'page' | 'modal'
}

const SnackbarContainer: React.FC<iProps> = observer(({ place }) => {
    
    const current = SnackbarStore.currentSnackbar
    
    if(!current) return null
    if(Modal.active && place === 'page') return null
    
    return (
        <Snackbar
        style={{ width: 'max-content' }}
        sizeX={SizeType.COMPACT}
        onClose={current.close}
      >
        {current.message}
      </Snackbar>
    )
})

SnackbarContainer.defaultProps = {
  place: 'page'
}

export default SnackbarContainer