import { FormItem, Group } from '@vkontakte/vkui'
import React from 'react'
import { iTrackView } from 'types/track'

import Styled from './styled'

import ChordsRow from './chords-row'

export interface iProps {
    track: iTrackView
}

const Chords: React.FC<iProps> = ({ track }) => {

    return (
        <FormItem top='Текст'>

            <Styled>

                {
                    track.chordsText.rows.map((row, index) => <ChordsRow key={index} rowIndex={index} words={row.words} spaceRow={row.spaceRow} />)
                }

            </Styled>

            {track.chordsNote && <Group description={track.chordsNote} />}

        </FormItem>
    )
}

export default Chords