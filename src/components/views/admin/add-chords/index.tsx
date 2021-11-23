import React from 'react'

import AddChordsForm from '../../../chords/add-chord'
import Snackbar from '../../../common/dialogs/snackbar'

const AddChordsView: React.FC = () => {

    return (
        <>
        <AddChordsForm />
        <Snackbar />
        </>
    )
}

export default AddChordsView