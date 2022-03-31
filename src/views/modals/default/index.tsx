import React from 'react'
import { ModalPage } from '@vkontakte/vkui'

import { Modal } from 'stores/root-store'

export default <ModalPage
    id='defaultModalPage'
    header={Modal.activeModalComponent?.modalData?.header &&
        Modal.activeModalComponent.modalData.header()}
    onClose={() => Modal.closeModal()}>
    {Modal.activeModalComponent?.modalData?.component &&
        Modal.activeModalComponent.modalData.component()}
</ModalPage> 