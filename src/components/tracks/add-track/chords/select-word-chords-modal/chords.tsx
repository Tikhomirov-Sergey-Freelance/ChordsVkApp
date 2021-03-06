import React, { useState, useEffect } from 'react'

import { loadChordsByQuery } from 'code/database/chords'
import useDebounce from 'code/hooks/use-debounce'
import { CustomSelect, FormItem } from '@vkontakte/vkui'

import OptionText from '../../../../common/vk/controls/select/option-text'


export interface iProps {
    chord: string
    onChange: (chord: string) => void
}

const Chords: React.FC<iProps> = ({ chord, onChange }) => {

    const [q, changeQuery] = useState('')
    const [loading, changeLoading] = useState(false)
    const [chordsList, setChordsList] = useState([])

    useEffect(() => {
        
        if(!chordsList.some(option => option.value === chord)) {

            const option = {
                label: chord,
                value: chord
            }

            setChordsList([...chordsList, option])
        }

    }, [chord])

    const loadChords = async (query: string) => {
        if (!query.length) return
        changeLoading(true)
        const data = await loadChordsByQuery(query)
        setChordsList(data.map(chord => ({
            label: chord.name,
            value: chord.name
        })))
        changeLoading(false)
    }

    const [loadChordsDebounce, clearDebounce] = useDebounce(loadChords)

    return (
        <>
            <FormItem top="Аккорд">
                <CustomSelect
                    placeholder="Введите аккорд"
                    searchable
                    onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const remoteQuery = e.target.value
                        changeQuery(remoteQuery)
                        loadChordsDebounce(remoteQuery)
                    }
                    }
                    onClose={() => {
                        clearDebounce()
                        changeLoading(false)
                    }}
                    onChange={event => onChange(event.target.value)}
                    value={chord}
                    filterFn={false}
                    options={chordsList}
                    fetching={loading}
                    renderDropdown={(!loading || !q.length) &&
                        (({ defaultDropdownContent }) =>
                            q.length ? defaultDropdownContent : <OptionText>Начните вводить аккорд</OptionText>)}
                />
            </FormItem>

        </>
    )
}

export default Chords