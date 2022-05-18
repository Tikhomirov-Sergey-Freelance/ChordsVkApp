import { iChord } from 'types/chord'

class ChordCanvas {

    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D

    params: iChord

    stepStrings: number
    stepFrets: number
    padding: number = 10
    topPadding: number = this.padding * 2.5

    stringsColor = 'black'
    fretsColor = '#99a2ad'

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')!
    }

    draw(params: iChord, width: number, height: number) {

        this.params = params
        this.canvas.width = width
        this.canvas.height = height

        this.clear()
        this.drawEmptyFrets()
    }

    drawEmptyFrets() {

        this.context.strokeStyle = this.stringsColor
        this.context.lineWidth = 1

        this.drawFrets()
        this.drawStrings()
        this.drawChords()

        this.drawDescription()
    }

    drawFrets() {

        let y = this.topPadding
        this.stepFrets = (this.canvas.height - this.padding - y) / 5

        for(let i = 0; i <= 5; i++) {
            this.drawLine(this.padding, y, this.canvas.width - this.padding, y)
            y += this.stepFrets
        }
    }

    drawStrings() {

        let x = this.canvas.width - this.padding
        this.stepStrings = (x - this.padding) / (this.params.guitarStrings.length - 1)

        this.params.guitarStrings.forEach((string) => {
            this.drawLine(x, this.topPadding, x, this.canvas.height - this.padding)
            x -= this.stepStrings
        })
    }

    drawChords() {

        this.context.strokeStyle = this.fretsColor
        this.context.lineWidth = 7

        this.drawBarre()
        this.drawStringFrets()
    }

    drawBarre() {

        if(!this.params.barre) return

        const strings = this.params.guitarStrings

        let skipStrings = 0

        for(let i = strings.length - 1; i >= 0; i--) {
                
            if(strings[i].fret !== 'notPlayed') {
                break
            }

            skipStrings++
        }

        const startX = this.padding + (skipStrings * this.stepStrings) - 2
        const endX = this.canvas.width - this.padding + 2
        const y = this.topPadding + (this.stepFrets / 2)

        this.drawLine(startX, y, endX, y)
    }

    drawStringFrets() {

        const strings = this.params.guitarStrings

        for(let i = strings.length - 1; i >= 0; i--) {

            const string = strings[i]

            if(string.fret === 'notPlayed' || string.fret === this.params.startFret) continue
            
            const fert: number = string.fret as number

            const x = this.canvas.width - this.padding - ((string.index - 1) * this.stepStrings)
            const y = this.topPadding + ((fert - (this.params.startFret + 1)) * this.stepFrets) + (this.stepFrets / 2)

            this.context.beginPath()

            this.context.fillStyle = this.fretsColor
            this.context.arc(x, y, 5, 0, Math.PI * 2)
            this.context.fill()

            this.context.beginPath()
        }
    }

    drawDescription() {

        if(this.params.startFret !== 0) {
            this.context.lineWidth = 0.75
            this.context.strokeText(this.params.startFret.toString(), this.padding - 10, (this.topPadding / 2) - 2)
        }

        for(let i = this.params.guitarStrings.length - 1; i >= 0; i--) {

            const string = this.params.guitarStrings[i]

            if(string.fret !== 'notPlayed') continue

            const x = this.canvas.width - this.padding - ((string.index - 1) * this.stepStrings)

            this.context.lineWidth = 0.5
            this.context.strokeText('X', x - 2.5, this.topPadding - 2)
        }

        this.context.lineWidth = 1
        this.context.font = '25px Arial'
        this.context.textAlign = 'center'
        this.context.strokeText(this.params.name, this.canvas.width / 2, this.topPadding - 13)
    }

    drawLine(startX: number, startY: number, endX: number, endY: number) {

        this.context.beginPath()

        this.context.moveTo(startX, startY)
        this.context.lineTo(endX, endY)
        this.context.stroke()

        this.context.beginPath()
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.beginPath()
    }
}

export default ChordCanvas