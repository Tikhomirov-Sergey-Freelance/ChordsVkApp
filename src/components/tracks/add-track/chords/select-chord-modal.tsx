import { Button, ModalCard } from '@vkontakte/vkui'
import React from 'react'

interface iProps {
    visible: boolean
    onClose: () => void
    onChange: (chord: string) => void
}

const SelectChordModal: React.FC<iProps> = ({ visible, onChange, onClose }) => {

    if (!visible) return null

    return (
        <ModalCard
            id='SelectChordField'
            onClose={onClose}
            actions={

                <>
ghfghfh ghfghf
                    <Button
                        size="l" 
                        mode="primary"
                        onClick={onClose}
                    >
                        Выбрать
                    </Button>
                </>
            }
        ></ModalCard>
    )
}

export default SelectChordModal