import { FormItem, SizeType, Textarea } from '@vkontakte/vkui'
import useDebounce from 'code/hooks/use-debounce'
import React from 'react'
import AddTrackStore from 'stores/add-track-store'

interface iProps {
    store: AddTrackStore
}

const Text: React.FC<iProps> = ({ store }) => {

    const [onChange] = useDebounce((text: string) => store.changeText(text), 200)

    return (
        <FormItem top='Текст'>
            <Textarea sizeY={SizeType.REGULAR} value={store.text} onChange={(event) => onChange(event.target.value)} />
        </FormItem>
    )
}

export default Text