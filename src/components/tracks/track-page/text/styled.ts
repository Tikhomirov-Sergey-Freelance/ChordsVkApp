import Styled from 'styled-components'

export default Styled.div`

    width: 100%;
    border-radius: inherit;
    min-height: 60px;
    margin: 0 10px;
    padding: 17px 11px;
    box-sizing: border-box;
    z-index: 2;

    .intro, .outro, .instrumental {

        display: flex;
        flex-wrap: wrap;

        .title {
            font-weight: bold;
        }

        .desctiption .vkuiGroup__description {
            padding: 0;
        } 

        .chord {
            margin: 0 3px;
            font-weight: bold;
        }
    }

    .intro { 
        margin-bottom: 10px;
    }

    .outro {
        margin-top: 10px;
    }

    .instrumental {
        margin: 1rem 0;
    }
    
    .space-row {
        margin-top: 1.4em;
    }    

    .chord-word-space {
        display: inline-block;
    }

    .chord-word {
        
        display: inline-block;
        position: relative;

        &.visible-chord {
            margin-top: 1.4em;
        }

        .chord {
            position: absolute;
            top: -1.2em;
            white-space: nowrap;
            font-weight: bold;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    }
`