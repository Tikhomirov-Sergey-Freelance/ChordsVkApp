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

    const { viewWidth } = useAdaptivity();

    const platform = usePlatform();
    const isDesktop = viewWidth! >= ViewWidth.TABLET;
    const hasHeader = platform !== VKCOM;

    return (

        <SplitLayout
            header={hasHeader && <PanelHeader separator={false} />}
            style={{ justifyContent: "center" }}
        >
            <DesktopNav />
            <SplitCol
                animate={!isDesktop}
                spaced={isDesktop}
                width={isDesktop ? '560px' : '100%'}
                maxWidth={isDesktop ? '560px' : '100%'}
            >
                
                    {children}
                
            </SplitCol>
        </SplitLayout>

    )
})

export default Layout