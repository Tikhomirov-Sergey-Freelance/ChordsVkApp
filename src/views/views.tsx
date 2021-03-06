import React from 'react'
import Tracks from './tracks'
import Track from './tracks/track'
import ArtistList from './tracks/artist-list'
import Artist from './tracks/artist'
import Chords from './chords'
import Favourites from './favorites'
import ProposeTrack from './tracks/propose-track'
import Admin from './admin'
import AdminAddChords from './admin/add-chords'
import AdminAddArtist from './admin/add-artist'
import AdminAddTrack from './admin/add-track'
import TrackCandidatesList from './admin/track-candidates'

export const views = [
    {
        id: 'tracks',
        panels: [
            {
                id: 'tracks',
                render: () => <Tracks />
            },
            {
                id: 'track',
                render: () => <Track />
            },
            {
                id: 'artist',
                render: () => <Artist />
            },
            {
                id: 'proposeTrack',
                render: () => <ProposeTrack />
            },
            {
                id: 'artistList',
                render: () => <ArtistList />
            },
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
            },
            {
                id: 'trackCandidatesList',
                render: () => <TrackCandidatesList />
            }
        ]
    },
]

export default views