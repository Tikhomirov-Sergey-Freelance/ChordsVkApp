import React from 'react'
import AddTrackStore from 'stores/pages/add-track-store'

import ModalPageStore from '../../../../stores/root/modal-page-store'
import { iChordsWord, iChordWordPosition, iChordsRow } from '../../../../types/track'

import ChordsWord from './chords-word'

export interface iProps {
    
}

const SpaceRow: React.FC<iProps> = () => {

    return (
        <div className='chord-row space-row' />
    )
}

export default SpaceRow