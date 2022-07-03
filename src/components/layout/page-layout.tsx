import React from 'react'
import { observer } from 'mobx-react-lite'
import { PanelHeader, SplitCol, SplitLayout, usePlatform, VKCOM } from '@vkontakte/vkui'

const Layout: React.FC = observer(({ children }) => {

    const platform = usePlatform()
    const hasHeader = platform !== VKCOM

    return (

        <SplitLayout
            header={hasHeader && <PanelHeader separator={false} />}
            style={{ justifyContent: 'center' }}
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