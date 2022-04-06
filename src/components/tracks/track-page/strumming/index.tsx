import { Icon24ArrowDownOutline, Icon24ArrowUpOutline, Icon24CancelOutline } from '@vkontakte/icons'
import { Group, Header, InfoRow, SimpleCell } from '@vkontakte/vkui'
import React from 'react'
import { StrummingType } from 'types/strumming'

import { iChordsWord, iTrackView } from '../../../../types/track'
import Styled from './styled'

export interface iProps {
    track: iTrackView
}

const Strumming: React.FC<iProps> = ({ track }) => {

    if (!track.strumming.length) return null

    const getIcon = (value: StrummingType) => {

        switch (value) {

            case StrummingType.down:
                return <Icon24ArrowDownOutline color='' />

            case StrummingType.up:
                return <Icon24ArrowUpOutline />

            case StrummingType.mutting:
                return <Icon24CancelOutline title='глушение' />

            case StrummingType.space:
                return <span className='space' />
        }
    }

    return (

        <Group
            header={<Header mode="secondary">Бой</Header>}
        >
            <SimpleCell>
                <Styled>

                    {
                        track.strumming.map(item => getIcon(item))
                    }

                </Styled>
            </SimpleCell>

            {track.strummingNote && <Group description={track.strummingNote} />}

        </Group>
    )
}

export default Strumming