import React from 'react'
import { observer } from 'mobx-react-lite'

import Store from '../../../../stores/snackbar'
import { Snackbar } from '@vkontakte/vkui'

const SnackbarContainer: React.FC = observer(() => {
    
    const current = Store.currentSnackbar
    if(!current) return null

    return (
        <Snackbar
        onClose={current.close}
      >
        {current.message}
      </Snackbar>
    )
})

export default SnackbarContainer