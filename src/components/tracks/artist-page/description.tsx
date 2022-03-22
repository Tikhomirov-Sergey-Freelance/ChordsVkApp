import React, { useState } from 'react'
import { Button, ModalPage, ModalRoot, Group, FormItem, Input, CustomSelect, CellButton, Header, PanelSpinner } from '@vkontakte/vkui'
import { loadChordsByQuery } from 'code/firebase/chords'
import { iArtist } from 'types/artists'
import ArtistPageStore from 'stores/artist-page-store'

interface iProps {
    store: ArtistPageStore
}

const Description: React.FC<iProps> = ({ store }) => {

    return (
        <FormItem top='Биография'>

            {store.artist.description}

        </FormItem>
    )
}

export default Description