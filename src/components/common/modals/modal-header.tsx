import React from 'react'
import { ModalPageHeader, PanelHeaderClose, useAdaptivity, ViewWidth, PanelHeaderEdit, Avatar, Div } from '@vkontakte/vkui'
import { Modal } from 'stores/root-store'


export interface iProps {
    title: string
}

const ModalHeader: React.FC<iProps> = ({ title }) => {

    const { viewWidth } = useAdaptivity()
    const isMobile = viewWidth <= ViewWidth.MOBILE

    return (
        <ModalPageHeader
            left={isMobile && <PanelHeaderClose onClick={() => Modal.closeModal()} />}
        >
            {title}
        </ModalPageHeader>
    )
}

export default ModalHeader