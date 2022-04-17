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
                <FormItem style={{ margin: 10 }}>
                    <div style={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}>
                        {store.artist.description}
                    </div>
                </FormItem>
            </Group>}
        </>
    )
}

export default Description