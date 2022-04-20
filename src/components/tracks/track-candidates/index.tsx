import { Group, Header, SimpleCell, Avatar, Text } from '@vkontakte/vkui'
import HeaderWithBack from 'components/vk/layout/header/heade-and-back'
import React from 'react'

import { TrackCandidatesStoreProvider } from 'stores/pages/track-candidates-store/track-candidates-store-provider'

import Page from './page'

export interface iProps {
}

const TrackCandidates: React.FC<iProps> = () => {

    return (

        <TrackCandidatesStoreProvider>

            <HeaderWithBack>
                Треки на добавление
            </HeaderWithBack>

            <Page />

        </TrackCandidatesStoreProvider>
    )
}

export default TrackCandidates