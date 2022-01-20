import React from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, View } from '@vkontakte/vkui'
import GlobalStore from '../../../stores/global-store'


const AdminView: React.FC = observer(() => {

    return (
        <>
            <PanelHeader>Администрирование</PanelHeader>

            <Group>
            
            <CellButton onClick={ () => GlobalStore.setActivePanel('addChords') }>
                Добавить аккорд
            </CellButton>

            <CellButton onClick={ () => GlobalStore.setActivePanel('addArtist') }>
                Добавить артиста
            </CellButton>

            <CellButton onClick={ () => GlobalStore.setActivePanel('addTrack') }>
                Добавить трек
            </CellButton>
        
            </Group>

        </>
    )
})

export default AdminView