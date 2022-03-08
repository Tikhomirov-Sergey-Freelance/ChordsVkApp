import { Panel, View, PanelHeader } from '@vkontakte/vkui'
import React from 'react'

import Snackbar from '../../common/dialogs/snackbar'
import Page from '../../main'

const TracksView: React.FC = (props) => {

    return (
        <>
            <Page/>
            <Snackbar />
        </>
    )  
}

export default TracksView