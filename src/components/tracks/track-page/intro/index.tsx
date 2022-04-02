import { Icon24ArrowDownOutline, Icon24ArrowUpOutline, Icon24CancelOutline } from '@vkontakte/icons'
import { Group, Header, InfoRow, SimpleCell } from '@vkontakte/vkui'
import React from 'react'
import { StrummingType } from 'types/strumming'

import { iChordsWord, iTrackView } from '../../../../types/track'
import Styled from './styled'

export interface iProps {
    track: iTrackView
}

const Intro: React.FC<iProps> = ({ track }) => {

    if (!track.intro || !track.intro.length) return null

    return (

        <Group
            header={<Header mode="secondary">Вступление</Header>}
        >
            <SimpleCell>
                <Styled>

                    {
                        track.intro.map(item => <span className='intro-chord'>{item}</span>)
                    }

                </Styled>
            </SimpleCell>

            {track.introNote && <Group description={track.introNote} />}

        </Group>
    )
}

export default Intro