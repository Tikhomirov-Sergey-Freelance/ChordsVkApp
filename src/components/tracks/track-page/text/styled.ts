import Styled from 'styled-components'

export default Styled.div`

    background: #f2f3f5;
    border-radius: inherit;
    border: 1px solid rgba(0, 0, 0, 0.12);
    min-height: 60px;
    margin: 0 10px;
    padding: 17px 11px;
    box-sizing: border-box;
    border-radius: 8px;

    .space-row {
        margin-top: 1.5rem;
    }    

    .chord-word-space {
        msrgin: 0.5em auto;
        display: inline-block;
    }

    .chord-word {
        
        display: inline-block;
        position: relative;
        margin: 0.5em 0;

        .chord {
            position: absolute;
            top: -1em;
            white-space: nowrap;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    }
`