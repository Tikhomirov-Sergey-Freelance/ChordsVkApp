import { FormItem, Group, Header, FormField } from '@vkontakte/vkui'
import React from 'react'
import { iTrackView } from 'types/track'

import Styled from './styled'

import ChordsRow from './chords-row'

export interface iProps {
    track: iTrackView
}

const Chords: React.FC<iProps> = ({ track }) => {

    return (
        <Group header={<Header mode="secondary">Текст</Header>}>

            <FormField style={{ margin: 10 }}>
                <Styled>
                    
                    {
                        track.chordsText.rows.map((row, index) => <ChordsRow key={index} rowIndex={index} row={row} />)
                    }

                </Styled>
            </FormField>

            {track.chordsNote && <Group description={track.chordsNote} />}

        </Group>
    )
}

export default Chords