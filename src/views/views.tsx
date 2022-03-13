import React from 'react'
import Tracks from './tracks'
import Chords from './chords'
import Favourites from './favourites'
import AddTrack from './add-track'
import Admin from './admin'
import AdminAddChords from './admin/add-chords'
import AdminAddArtist from './admin/add-artist'
import AdminAddTrack from './admin/add-track'

export const views = [
    {
        id: 'tracks',
        panels: [
            {
                id: 'tracks',
                render: () => <Tracks />
            }
        ]
    },
    {
        id: 'chords',
        panels: [
            {
                id: 'chords',
                render: () => <Chords />
            }
        ]
    },
    {
        id: 'favourites',
        panels: [
            {
                id: 'favourites',
                render: () => <Favourites />
            }
        ]
    },
    {
        id: 'admin',
        panels: [
            {
                id: 'admin',
                render: () => <Admin />
            },
            {
                id: 'addChords',
                render: () => <AdminAddChords />
            },
            {
                id: 'addArtist',
                render: () => <AdminAddArtist />
            },
            {
                id: 'addTrack',
                render: () => <AdminAddTrack />
            }
        ]
    },
]

export default views