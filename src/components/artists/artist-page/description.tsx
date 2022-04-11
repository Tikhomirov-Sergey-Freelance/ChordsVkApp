import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton, Header, PanelSpinner, SimpleCell, MiniInfoCell, Textarea } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/database/chords'
import { iArtist } from 'types/artists'
import ArtistPageStore from 'stores/pages/artist-page-store'

interface iProps {
    store: ArtistPageStore
}

const Description: React.FC<iProps> = ({ store }) => {

    return (
        <>
            {store.artist.description && <Group header={<Header mode="secondary">Биография</Header>}>
                <Textarea value={store.artist.description} readOnly={true}/>
            </Group>}
        </>
    )
}

export default Description