import React, { useEffect, useRef } from 'react'
import { Group, Header, CardGrid, Card } from '@vkontakte/vkui'
import { iChord } from '../../types/chord'
import ChordCanvas from 'code/canvas/chord'

export interface iProps {
    chord: iChord

    width?: number
    height?: number
}

const Chord: React.FC<iProps> = ({ chord, width, height }) => {

    const canvas = useRef<HTMLCanvasElement>(null)
    const chordCanvasRef = useRef<ChordCanvas>()

    useEffect(() => {

        chordCanvasRef.current = new ChordCanvas(canvas.current!)
        chordCanvasRef.current!.draw(chord, width, height)

    }, [])

    return (
        <Card style={{ padding: 7, display: 'flex', justifyContent: 'center', width, height }}>
            <canvas ref={canvas} width={width} height={height} />
        </Card>
    )
}

Chord.defaultProps = {
    width: 110,
    height: 170
}

export default Chord