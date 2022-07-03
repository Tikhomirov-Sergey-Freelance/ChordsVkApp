import { Group, Header, SimpleCell } from '@vkontakte/vkui'
import React from 'react'

import { iTrackView } from '../../../../types/track'

export interface iProps {
    track: iTrackView
}

const Strumming: React.FC<iProps> = ({ track }) => {

    if (!track.riff) return null

    return (

        <Group
            header={<Header mode="secondary">Перебор</Header>}
        >
            <SimpleCell>
                {track.riff}
            </SimpleCell>

            {track.riffNote && <Group description={track.riffNote} />}

        </Group>
    )
}

export default Strumming