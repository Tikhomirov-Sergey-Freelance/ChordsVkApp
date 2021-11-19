import React, { useEffect, useRef, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { Div } from '@vkontakte/vkui'

import Store from '../../../../stores/add-chords-store'
import ChordCanvas from '../../../../code/canvas/chord'

const Fret: React.FC = observer(() => {

    const canvas = useRef<HTMLCanvasElement>(null)
    const params = Store.chordParams

    const chordCanvasRef = useRef<ChordCanvas>()

    useEffect(() => {
        Store.canvas = chordCanvasRef.current = new ChordCanvas(canvas.current!)
    }, [])

    useEffect(() => {

        const chordCanvas = chordCanvasRef.current!
        chordCanvas.draw(params, params.instrument === 'ukulele' ? 90 : 110, 170)

    }, [params])

    console.log('rerender')

    return (
        <Div style={{display: 'flex', justifyContent: 'center'}}>
            <canvas ref={canvas} width={110} height={170}/>
        </Div> 
    )

})

export default Fret