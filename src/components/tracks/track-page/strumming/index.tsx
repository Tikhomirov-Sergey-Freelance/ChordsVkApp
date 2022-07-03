import { Icon24ArrowDownOutline, Icon24ArrowUpOutline, Icon24CancelOutline } from '@vkontakte/icons'
import { Group, Header, SimpleCell } from '@vkontakte/vkui'
import React from 'react'
import { StrummingType } from 'types/strumming'

import { iTrackView } from '../../../../types/track'
import Styled from './styled'

export interface iProps {
    track: iTrackView
}

const Strumming: React.FC<iProps> = ({ track }) => {

    if (!track.strumming.length && !track.strummingNote) return null

    const getIcon = (value: StrummingType, index: number) => {

        switch (value) {

            case StrummingType.down:
                return <Icon24ArrowDownOutline key={index} color="" />

            case StrummingType.up:
                return <Icon24ArrowUpOutline key={index} />

            case StrummingType.mutting:
                return <Icon24CancelOutline key={index} title="глушение" />

            case StrummingType.space:
                return <span key={index} className="space" />
        }
    }

    return (

        <Group
            header={<Header mode="secondary">Бой</Header>}
        >
            {!!track.strumming.length && <SimpleCell>
                <Styled>

                    {
                        track.strumming.map((item, index) => getIcon(item, index))
                    }

                </Styled>
            </SimpleCell>}

            {!track.strumming.length && <SimpleCell>{track.strummingNote}</SimpleCell>}
            {!!track.strumming.length && track.strummingNote && <Group description={track.strummingNote} />}

        </Group>
    )
}

export default Strumming