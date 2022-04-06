import React, { useEffect } from 'react'
import { Panel, PanelHeader, View, PanelSpinner, Group, ModalCardBase, Button, Placeholder } from '@vkontakte/vkui'
import { Icon56LikeOutline } from '@vkontakte/icons'
import { Global, Router } from 'stores/root-store'

const EmptyFavoritesList: React.FC = () => {

    return (
        <>
            <PanelHeader>Моя коллекция</PanelHeader>

            <Group>

                <Placeholder
                    header='Ваша коллекция пуста'
                    action={<Button
                        size='l'
                        mode='outline'
                        key='button'
                        onClick={() => Router.setActiveStory('tracks')}>
                        Найти трек
                    </Button>}
                >
                    Найдите любимые треки и добавьте их в коллекцию
                </Placeholder>

            </Group>
        </>
    )
}

export default EmptyFavoritesList