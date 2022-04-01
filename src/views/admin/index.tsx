import React from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, Panel, PanelHeader, View } from '@vkontakte/vkui'
import { Router } from 'stores/root-store'


const AdminView: React.FC = observer(() => {

    return (
        <>
            <PanelHeader>Администрирование</PanelHeader>

            <Group>
            
            <CellButton onClick={ () => Router.setActivePanel('addChords') }>
                Добавить аккорд
            </CellButton>

            <CellButton onClick={ () => Router.setActivePanel('addArtist') }>
                Добавить артиста
            </CellButton>

            <CellButton onClick={ () => Router.setActivePanel('addTrack') }>
                Добавить трек
            </CellButton>
        
            </Group>

        </>
    )
})

export default AdminView