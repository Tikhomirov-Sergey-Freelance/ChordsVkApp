import React from 'react'
import { Group } from '@vkontakte/vkui'

import { iTrackView } from '../../../../types/track'

export interface iProps {
    mode: 'intro' | 'outro' | 'instrumental'
    chords?: string[]
    note?: string
}

const Instrumental: React.FC<iProps> = ({ mode, chords, note }) => {
    
    if (!chords.length && !note) return null

    const getTitle = () => {

        switch (mode) {
            case 'intro': return 'Вступление'
            case 'outro': return 'Концовка'
            case 'instrumental': return 'Проигрыш'
        }
    }

    return (

        <div className={mode}>

            <span className='title'>{getTitle()}:</span> 

            {!chords.length && <span className='info'>{note}</span>}

            {
                chords.map(item => <span className='chord'>{item}</span>)
            }

            {chords.length && note && <Group className='desctiption' description={note} />}

        </div>
    )
}

Instrumental.defaultProps = {
    chords: []
}

export default Instrumental