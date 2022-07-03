import React from 'react'
import { PanelHeader, Group, Button, Placeholder } from '@vkontakte/vkui'
import { Router } from 'stores/root-store'

const EmptyFavoritesList: React.FC = () => {

    return (
        <>
            <PanelHeader>Моя коллекция</PanelHeader>

            <Group>

                <Placeholder
                    header="Ваша коллекция пуста"
                    action={<Button
                        size="l"
                        mode="outline"
                        key="button"
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