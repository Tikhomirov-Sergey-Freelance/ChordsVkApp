import React from 'react'
import { observer } from 'mobx-react-lite'
import { Epic, PanelHeader, SplitCol, SplitLayout, useAdaptivity, usePlatform, ViewWidth, VKCOM } from '@vkontakte/vkui'

import GlobalStore from '../../stores/global-store'

import DesktopNav from '../navigation/desktop'
import MobileNav from '../navigation/mobile'

interface iProps {
    children: JSX.Element[]
}

const Layout: React.FC = observer(({ children }) => {

    const platform = usePlatform();
    const hasHeader = platform !== VKCOM;

    return (

        <SplitLayout
            header={hasHeader && <PanelHeader separator={false} />}
            style={{ justifyContent: "center" }}
        >
            
            <SplitCol
                width={'100%'}
                maxWidth={'100%'}
            >
                
                    {children}
                
            </SplitCol>
        </SplitLayout>

    )
})

export default Layout