import React from 'react'

import Snackbar from '../../../common/dialogs/snackbar'
import Form from '../../../tracks/add-track'

const AddTrackView: React.FC = () => {

    return (
        <>
            <Form />
            <Snackbar />
        </>
    )
}

export default AddTrackView