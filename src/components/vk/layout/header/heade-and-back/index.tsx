import React, { Children } from 'react'
import { observer } from 'mobx-react-lite'
import { PanelHeader, PanelHeaderBack, PanelHeaderProps } from '@vkontakte/vkui'

import { Router } from 'stores/root-store'


const HeaderWithBack: React.FC<PanelHeaderProps> = observer((props) => {

    return (
        <PanelHeader
            left={<PanelHeaderBack onClick={() => Router.toMainPanel() }/>}
            {...props}
        >
           {props.children}
        </PanelHeader> 
    )
})

export default HeaderWithBack