import React from 'react'
import { Modal } from '../../../stores/root-store'
import ModalPage from '../../../components/chords/select-chord-modal'

export const showSelectChordModal = async (onSelect: (chord: string) => void, onClose: () => void = null) => {

    const onSelectChord = (chord: string) => {
        onSelect(chord)
    }

    const closeModal = () => {

        if(onClose) {
            onClose()
        }

        Modal.closeModal()
    }

    const component = () => <ModalPage onSelect={onSelectChord} onClose={closeModal} />
    Modal.openModal('defaultModalPage', { component })
}