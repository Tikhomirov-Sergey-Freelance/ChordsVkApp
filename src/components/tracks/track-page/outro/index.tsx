import { Icon24ArrowDownOutline, Icon24ArrowUpOutline, Icon24CancelOutline } from '@vkontakte/icons'
import { Group, Header, InfoRow, SimpleCell } from '@vkontakte/vkui'
import React from 'react'
import { StrummingType } from 'types/strumming'

import { iChordsWord, iTrackView } from '../../../../types/track'
import Styled from './styled'

export interface iProps {
    track: iTrackView
}

const Outro: React.FC<iProps> = ({ track }) => {

    if (!track.outro || !track.outro.length) return null

    return (

        <Group
            header={<Header mode="secondary">Концовка</Header>}
        >
            <SimpleCell>
                <Styled>

                    {
                        track.outro.map(item => <span className='intro-chord'>{item}</span>)
                    }

                </Styled>
            </SimpleCell>

            {track.outroNote && <Group description={track.outroNote} />}

        </Group>
    )
}

export default Outro