import React, { Children } from 'react'
import { observer } from 'mobx-react-lite'
import { PanelHeader, PanelHeaderClose, PanelHeaderProps } from '@vkontakte/vkui'

import GlobalStore from '../../../../../stores/global-store'


const HeaderWithBack: React.FC<PanelHeaderProps> = observer((props) => {

    return (
        <PanelHeader
            left={<PanelHeaderClose onClick={() => GlobalStore.toMainPanel() }/>}
            {...props}
        >
           {props.children}
        </PanelHeader> 
    )
})

export default HeaderWithBack