import React from 'react'
import { Button, Footer, ModalCardBase } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import MainPageStore from '../../../../stores/pages/main-page-store'
import { Router } from 'stores/root-store'
import { toJS } from 'mobx'

const EmptyResult: React.FC = () => {

    const goToPropose = () => {
        const data = { query: toJS(MainPageStore.searchQuery) }
        Router.setActiveStory('proposeTrack', null, data)
    }

    return (<ModalCardBase
        style={{ margin: 15 }}
        header='Трек не найден'
        subheader='Вы можете предложить трек, мы постараемся его добавить'
        actions={
            <Button
                size='l'
                mode='outline'
                key='button'
                onClick={goToPropose}>
                Предложить трек
            </Button>
        }
    />)
}

export default observer(EmptyResult) 