import React, { Children } from 'react'
import { observer } from 'mobx-react-lite'
import { PanelHeader, PanelHeaderClose, PanelHeaderProps } from '@vkontakte/vkui'

import { Router } from 'stores/root-store'


const HeaderWithBack: React.FC<PanelHeaderProps> = observer((props) => {

    return (
        <PanelHeader
            left={<PanelHeaderClose onClick={() => Router.toMainPanel() }/>}
            {...props}
        >
           {props.children}
        </PanelHeader> 
    )
})

export default HeaderWithBack