import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton, Header, PanelSpinner, SimpleCell } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/firebase/chords'
import { iArtist } from 'types/artists'
import ArtistPageStore from 'stores/artist-page-store'

interface iProps {
    store: ArtistPageStore
}

const Description: React.FC<iProps> = ({ store }) => {

    return (
        <Group header={<Header mode="secondary">Биография</Header>}>
            <SimpleCell>
                {store.artist.description}
            </SimpleCell>
        </Group>
    )
}

export default Description