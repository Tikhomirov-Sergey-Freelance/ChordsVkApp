import React from 'react'
import { observer } from 'mobx-react-lite'

import { Modal } from 'stores/root-store'

const Header: React.FC = () => {

    if(!Modal.activeModalComponent?.modalData?.header) {
        return null
    }

    return (
        <>
           {Modal.activeModalComponent.modalData.header()}
        </>
    )
}

export default observer(Header)