import React from 'react'
import { Button, Footer, ModalCardBase } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import ProposeTrackButton from '../../propose-track-button'

const EmptyResult: React.FC = () => {

    return (<ModalCardBase
    
        style={{ margin: 15 }}
        header='Трек не найден'
        subheader='Вы можете предложить трек, мы постараемся его добавить'
        actions={
            <ProposeTrackButton />
        }
    />)
}

export default observer(EmptyResult) 