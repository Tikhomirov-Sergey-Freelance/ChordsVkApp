import React, { useEffect } from 'react'
import { Panel, PanelHeader, View, PanelSpinner, Group, ModalCardBase, Button } from '@vkontakte/vkui'
import { Icon56LikeOutline } from '@vkontakte/icons'
import { Global, Router } from 'stores/root-store'

const EmptyFavoritesList: React.FC = () => {

    return (
        <>
            <PanelHeader>Моя коллекция</PanelHeader>

            <Group>

                <ModalCardBase
                    style= {{ margin: 15 }}
                    header="Ваша коллекция пуста"
                    subheader="Найдите любимые треки и добавьте их в коллекцию"
                    actions={
                        <Button size="l" mode="primary" key="button" onClick={() => Router.setActiveStory('tracks')}>
                            Найти трек
                        </Button>
                    }
                    icon={<Icon56LikeOutline />}
                />

            </Group>
        </>
    )
}

export default EmptyFavoritesList