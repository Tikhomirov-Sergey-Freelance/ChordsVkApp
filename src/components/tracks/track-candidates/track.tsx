import React from 'react'
import { SimpleCell, Text, IconButton } from '@vkontakte/vkui'
import { Icon24UserAdd, Icon24Add, Icon24Delete } from '@vkontakte/icons'

import { observer } from 'mobx-react-lite'
import { iTrackCandidatesView } from 'types/track-candidate'
import { addArtistFromTrackCandidate } from 'code/artist/add-artist'
import { addTrackFromCandidate } from 'code/tracks/add-track'

export interface iProps {
    track: iTrackCandidatesView
    cancellTrack: (id: string) => void
}

const Track: React.FC<iProps> = ({ track, cancellTrack }) => {

    return (
        <SimpleCell
            onClick={track.foundArtist ?
                () => addTrackFromCandidate(track) :
                () => addArtistFromTrackCandidate(track)
            }

            description={<Text weight="regular"
                style={{ color: track.foundArtist ? 'green' : 'red' }}
            >
                {track.artist}
            </Text>}
            after={
                <>
                    <IconButton
                        onClick={(event) => { event.stopPropagation(); addArtistFromTrackCandidate(track) }}>
                        <Icon24UserAdd />
                    </IconButton>

                    <IconButton
                        onClick={(event) => { event.stopPropagation(); addTrackFromCandidate(track) }}>
                        <Icon24Add />
                    </IconButton>

                    <IconButton
                        onClick={(event) => { event.stopPropagation(); cancellTrack(track.id) }}>
                        <Icon24Delete />
                    </IconButton>
                </>
            }
        >
            {track.name}
        </SimpleCell>
    )
}

export default observer(Track)