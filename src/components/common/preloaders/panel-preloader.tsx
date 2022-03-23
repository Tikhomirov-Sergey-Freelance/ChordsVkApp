import React from 'react'
import { Group, PanelHeader, PanelSpinner } from '@vkontakte/vkui'

export interface iProps {
    title?: string
}

const PanelPreloader: React.FC<iProps> = ({ title }) => {

    return (
        <>
            {title && <PanelHeader>{title}</PanelHeader>}

            <Group style={{ display: 'flex', height: '100%', width: '100%', margin: 'auto', justifyContent: 'center' }}>
                <PanelSpinner size="large" />
            </Group>
        </>
    )
}

export default PanelPreloader