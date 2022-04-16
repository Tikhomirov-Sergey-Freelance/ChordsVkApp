import { FormItem, Group, Header, FormField } from '@vkontakte/vkui'
import React from 'react'
import { iChordsRow, iTrackView } from 'types/track'

import Styled from './styled'
import Instrumental from './instrumental'

import ChordsRow from './chords-row'
import SpaceRow from './space-row'

export interface iProps {
    track: iTrackView
}

const Chords: React.FC<iProps> = ({ track }) => {

    const getRow = (row: iChordsRow, index: number) => {

        if(row.space) {
            return <SpaceRow key={index} />
        }

        if(row.instrumental) {
            return <Instrumental mode='instrumental' chords={row.instrumental.chords} note={row.instrumental.note}/>
        }

        return <ChordsRow key={index} rowIndex={index} row={row} />
    }

    return (
        <Group header={<Header mode="secondary">Текст</Header>}>

            <FormField style={{ margin: 10 }}>
                <Styled>

                    <Instrumental mode='intro' chords={track.intro} note={track.introNote} />
                    
                    {
                        track.chordsText.rows.map((row, index) => getRow(row, index))
                    }

                    <Instrumental mode='outro' chords={track.outro} note={track.outroNote}/>

                </Styled>
            </FormField>

            {track.chordsNote && <Group description={track.chordsNote} />}

        </Group>
    )
}

export default Chords