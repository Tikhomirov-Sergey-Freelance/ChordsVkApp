import React from 'react'

import Snackbar from '../../../common/dialogs/snackbar'
import Form from '../../../tracks/add-artist'

const AddArtistView: React.FC = () => {

    return (
        <>
            <Form />
            <Snackbar />
        </>
    )
}

export default AddArtistView