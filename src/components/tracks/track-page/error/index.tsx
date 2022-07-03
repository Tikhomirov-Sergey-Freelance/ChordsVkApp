import React from 'react'

import { Button, Group } from '@vkontakte/vkui'
import TrackPageStore from 'stores/pages/track-page-store'
import { Modal } from 'stores/root-store'

import DialogHeader from '../../../common/modals/modal-header'
import Dialog from './error-dialog'

export interface iProps {
    store: TrackPageStore
}

const ErrorButton: React.FC<iProps> = ({ store }) => {

    const showErrorModal = () => {

        const sendError = (error) => {
            store.sendError(error)
        }

        const header = () => <DialogHeader title="Пожалуйста, опишите ошибку" />
        const component = () => <Dialog sendError={sendError} onClose={() => Modal.closeModal()} />
        Modal.openModal('defaultModalPage', { header, component })
    }

    return (
        <Group style={{ padding: '0 10px' }}>
            <Button
                size="l"
                stretched={true}
                mode="outline"
                key="button"
                onClick={showErrorModal}>
                Нашли ошибку?
            </Button>
        </Group>
    )
}

export default ErrorButton