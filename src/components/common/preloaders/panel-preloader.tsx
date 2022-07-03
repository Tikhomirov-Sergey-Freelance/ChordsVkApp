import React from 'react'
import { PanelHeader, PanelSpinner } from '@vkontakte/vkui'

export interface iProps {
    title?: string
}

const PanelPreloader: React.FC<iProps> = ({ title }) => {

    return (
        <>
            {title && <PanelHeader>{title}</PanelHeader>}

            <div style={{
                display: 'flex',
                height: '100%',
                minHeight: 300,
                width: '100%',
                margin: 'auto',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <PanelSpinner size="large" />
            </div>
        </>
    )
}

export default PanelPreloader