import React, { useEffect, useRef } from 'react'
import { Group, Header, CardGrid, Card, HorizontalCell } from '@vkontakte/vkui'
import { iChord } from '../../types/chord'
import ChordCanvas from 'code/canvas/chord'

export interface iProps {
    chord: iChord

    width?: number
    height?: number

    style?: React.CSSProperties
}

const Chord: React.FC<iProps> = ({ chord, width, height, style }) => {

    const canvas = useRef<HTMLCanvasElement>(null)
    const chordCanvasRef = useRef<ChordCanvas>()

    useEffect(() => {

        chordCanvasRef.current = new ChordCanvas(canvas.current!)
        chordCanvasRef.current!.draw(chord, width, height)

    }, [])

    return (
        <HorizontalCell disabled style={{ margin: '0 20px', padding: 7, display: 'flex', justifyContent: 'center', width: width + 20, height: height + 10, ...style  }}>
            <canvas ref={canvas} width={width} height={height} />
        </HorizontalCell> 
    )
}

Chord.defaultProps = {
    width: 110,
    height: 170,
    style: {}
}

export default Chord