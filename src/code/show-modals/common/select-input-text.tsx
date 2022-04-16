import React from 'react'
import { Modal } from 'stores/root-store'

import Header from 'components/common/modals/modal-header'
import ModalPage from 'components/common/modals/select-input-modal'

export interface iProps {

    title: string

    onSelect: (text: string) => void
    onClose?: () => void

    defaultText?: string
} 

export const showInputModal = async (params: iProps) => {

    return new Promise<string>((resolve) => {

        const onSelectText = (text: string) => {
            params.onSelect(text)
            Modal.closeModal()
        }

        const closeModal = () => {

            if(params.onClose) {
                params.onClose()
            }

            Modal.closeModal()
        }
    
        const header = () => <Header title={params.title} />
        const component = () => <ModalPage onSelect={onSelectText} onClose={closeModal} defaultText={params.defaultText} />
        Modal.openModal('defaultModalPage', { header, component })
    })
}