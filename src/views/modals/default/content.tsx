import React from 'react'
import { observer } from 'mobx-react-lite'

import { Modal } from 'stores/root-store'

const Content: React.FC = () => {

    if(!Modal.activeModalComponent?.modalData?.component) {
        return null
    }

    return (
        <>
           {Modal.activeModalComponent.modalData.component()}
        </>
    )
}

export default observer(Content)