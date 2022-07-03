import React from 'react'
import { ModalPage } from '@vkontakte/vkui'

import { Modal } from 'stores/root-store'
import Header from './header'
import Content from './content'

export default <ModalPage
    key="defaultModalPage"
    id="defaultModalPage"
    header={<Header />}
    onClose={() => Modal.closeModal()}>
    <Content />
</ModalPage> 