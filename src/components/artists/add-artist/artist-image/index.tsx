import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'

import { Icon24Camera } from '@vkontakte/icons'
import { Avatar, FormItem, File } from '@vkontakte/vkui'

import { useAddArtistStore } from 'stores/pages/add-artist-store/add-artist-store-provider'

import Styled from './styled'

const ArtistImage: React.FC = () => {

    const store = useAddArtistStore()
    const refImageInput = useRef(null)

    return (
        <FormItem top="Загрузите логотип артиста">
            <Styled>
                <Avatar size={45} mode="app" src={store.imageDataSrc || store.artistImage} className="artist-image" />
                <File
                    before={<Icon24Camera />}
                    controlSize="m"
                    onChange={(event) => store.changeImage(event.target.files[0])}
                    getRef={refImageInput}
                >
                    Открыть галерею
                </File>
            </Styled>
        </FormItem>
    )
}

export default observer(ArtistImage)