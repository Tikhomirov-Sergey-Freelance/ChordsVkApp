import React, { useEffect, useRef } from 'react'
import { Group, Header, CardGrid, Card } from '@vkontakte/vkui'
import { iParams as ChordParam } from '../../../stores/add-chords-store'
import ChordCanvas from 'code/canvas/chord'

export interface iProps {
    chord: ChordParam
}

const Chord: React.FC<iProps> = ({ chord }) => {

    const canvas = useRef<HTMLCanvasElement>(null)
    const chordCanvasRef = useRef<ChordCanvas>()
    
    useEffect(() => {

        chordCanvasRef.current = new ChordCanvas(canvas.current!)
        chordCanvasRef.current!.draw(chord, 110, 170)

    }, [])      

    return (
        <Card>
            <div style={{ padding: 7, display: 'flex', justifyContent: 'center' }}>
                <canvas ref={canvas} width={110} height={170}/>
            </div>
        </Card>
    )
}

export default Chord