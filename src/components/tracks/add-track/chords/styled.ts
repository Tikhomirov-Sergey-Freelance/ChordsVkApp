import Styled from 'styled-components'

export default Styled.div`

    width: 100%;
    border-radius: inherit;
    min-height: 60px;
    padding: 17px 11px;
    box-sizing: border-box;
    z-index: 2;

    .space-row {

        height: 1.5rem;
        display: flex;
        align-items: center;
        cursor: pointer;
    }    

    .chord-word {
        
        display: inline-block;
        position: relative;
        margin: 0.5em 0.2em;
        
        cursor:pointer;

        .chord {
            position: absolute;
            font-weight: bold;
            top: -1em;
            white-space: nowrap;
        }

        &:hover {
            color: #2688eb;
        }
    }

    .instrumental-row {

        display: flex;
        justify-content: space-between;
        margin-top: 1.2rem;
        padding-right: 10px;

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

        .actions {

            display: flex;
            cursor: pointer;
            font-weight: none;

            .vkuiIcon {
                margin: 0 2px;
            }
        }
    }
`