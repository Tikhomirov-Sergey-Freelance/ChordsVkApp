import { FormItem, SizeType, Textarea } from '@vkontakte/vkui'
import useDebounce from 'code/hooks/use-debounce'
import { observer } from 'mobx-react-lite'
import React from 'react'
import AddTrackStore from 'stores/add-track-store'

interface iProps {
    store: AddTrackStore
}

const Text: React.FC<iProps> = ({ store }) => {

    const [onChangeChordText] = useDebounce((text: string) => store.changeChordText(text), 200)

    const onChangeText = (text) => {
        store.changeText(text)
        onChangeChordText(text)
    }  

    return (
        <FormItem top='Текст'>
            <Textarea sizeY={SizeType.REGULAR} value={store.text} onChange={(event) => onChangeText(event.target.value)} />
        </FormItem>
    ) 
}

export default observer(Text)