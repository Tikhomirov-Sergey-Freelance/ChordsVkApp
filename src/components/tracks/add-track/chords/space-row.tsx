import React from 'react'
import AddTrackStore from 'stores/pages/add-track-store'
import { Icon16Add } from '@vkontakte/icons'

import { iChordsRow } from '../../../../types/track'

export interface iProps {
    rows: iChordsRow[]
    rowIndex: number
    store: AddTrackStore
}

const SpaceRow: React.FC<iProps> = ({ store, rowIndex, rows }) => {

    const hideActions = !rows ||
        (rows.length - 1 !== rowIndex && rows[rowIndex + 1].instrumental) ||
        (rowIndex !== 0 && rows[rowIndex - 1].instrumental)

    return (
        <div className="chord-row space-row" onClick={!hideActions && (() => store.addInstrumentalRow(rowIndex))}>
            <div className="actions">
                {!hideActions && <Icon16Add title="добавить проигрыш" />}
            </div>
        </div>
    )
}

export default SpaceRow