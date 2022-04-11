import Styled from 'styled-components'

export default Styled.div`

    border-radius: inherit;
    min-height: 60px;
    padding: 17px 11px;
    box-sizing: border-box;
    z-index: 2;

    .space-row {
        margin-top: 1.5rem;
    }    

    .chord-word {
        
        display: inline-block;
        position: relative;
        margin: 0.5em 0.2em;
        
        cursor:pointer;

        .chord {
            position: absolute;
            top: -1em;
            white-space: nowrap;
        }

        &:hover {
            color: #2688eb;
        }
    }
`