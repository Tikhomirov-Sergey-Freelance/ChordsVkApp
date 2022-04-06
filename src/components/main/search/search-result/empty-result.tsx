import React from 'react'
import { Button, Footer, ModalCardBase, Placeholder } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import ProposeTrackButton from '../../propose-track-button'

const EmptyResult: React.FC = () => {

    return (
        <Placeholder
        header='Трек не найден'
        action={<ProposeTrackButton />}
      >
        Вы можете предложить трек, мы постараемся его добавить
      </Placeholder>)
}

export default observer(EmptyResult) 