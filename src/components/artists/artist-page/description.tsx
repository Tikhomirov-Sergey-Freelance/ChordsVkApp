import React from 'react'
import { Group, FormItem, Header } from '@vkontakte/vkui'

import ArtistPageStore from 'stores/pages/artist-page-store'

interface iProps {
    store: ArtistPageStore
}

const Description: React.FC<iProps> = ({ store }) => {
    
    return (
        <>
            {store.artist.description && <Group header={<Header mode="secondary">Биография</Header>}>
                <FormItem style={{ margin: 10 }}>
                    <div style={{ whiteSpace: 'pre-line', overflowWrap: 'break-word' }}>
                        {store.artist.description}
                    </div>
                </FormItem>
            </Group>}
        </>
    )
}

export default Description