import React, { useState } from 'react'
import AddTrackStore from 'stores/pages/add-track-store'
import { Icon16Add, Icon16Text, Icon16Delete } from '@vkontakte/icons'

import { showSelectChordModal } from '../../../../code/show-modals/chords/select-chord'
import { iChordsRow } from '../../../../types/track'
import { showInputModal } from 'code/show-modals/common/select-input-text'
import { Group } from '@vkontakte/vkui'

export interface iProps {
    rowIndex: number
    row: iChordsRow
    store: AddTrackStore
}

const InstrumentalRow: React.FC<iProps> = ({ store, rowIndex, row }) => {

    const chords = row.instrumental.chords || []
    const note = row.instrumental.note

    const addChord = (chord: string) => {
        store.addInctrumentalChord(rowIndex, chord)
    }

    const selectNote = () => {
        showInputModal({
            title: 'Примечание к проигрышу',
            defaultText: note || '',
            onSelect: (text) => store.addInstrumentalNote(rowIndex, text)
        })
    }

    return (
        
        <div className='chord-row instrumental-row'>

            <div>
                <span className='title'>Проигрыш: </span>

                {!!!chords.length && <span className='info'>{note}</span>}

                {
                    chords.map(item => <span className='chord'>{item}</span>)
                }

                {!!chords.length && note && <Group className='desctiption' description={note} />}
            </div>

            <div className='actions'>
                <Icon16Add title='добавить аккорд' onClick={() => showSelectChordModal(addChord)} />
                <Icon16Text title='добавить примечание' onClick={selectNote} />
                <Icon16Delete title='удалить' onClick={() => store.deleteInstrumentalChord(rowIndex)} />
            </div>

        </div>
    )
}

export default InstrumentalRow