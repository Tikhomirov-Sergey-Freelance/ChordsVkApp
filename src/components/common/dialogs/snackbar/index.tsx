import React from 'react'
import { observer } from 'mobx-react-lite'

import Store from '../../../../stores/root/snackbar'
import { SizeType, Snackbar } from '@vkontakte/vkui'

const SnackbarContainer: React.FC = observer(() => {
    
    const current = Store.currentSnackbar
    if(!current) return null

    return (
        <Snackbar
        sizeX={SizeType.COMPACT}
        onClose={current.close}
      >
        {current.message}
      </Snackbar>
    )
})

export default SnackbarContainer