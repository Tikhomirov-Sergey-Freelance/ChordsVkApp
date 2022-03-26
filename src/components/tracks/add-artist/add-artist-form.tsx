import React, { useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { CellButton, Group, File, FormItem, SliderSwitch, Select, CustomSelectOption, PanelHeaderSubmit, Input, Avatar, Textarea, CardScroll, Card } from '@vkontakte/vkui'

import { useAddArtistStore } from 'stores/add-artist-store/add-artist-store-provider'
import AddArtistStore from '../../../stores/add-artist-store'
import { Icon24Camera } from '@vkontakte/icons'

import ArtistImage from './artist-image'

const AddArtistForm: React.FC = observer(() => {

    const store = useAddArtistStore()

    return (

        <Group>

            <FormItem top='Название'>
                <Input value={store.name} onInput={event => store.changeProperty('name', event.currentTarget.value)} />
            </FormItem>

            <ArtistImage />

            <FormItem top='Описание'>
                <Textarea value={store.description} onInput={event => store.changeProperty('description', event.currentTarget.value)} />
            </FormItem>

            <CardScroll onScroll={(e => { debugger; })}>

                <Card>
                    <div style={{ width: 100, height: 200, margin: 5, backgroundColor: 'black' }}>
                        dddd
                    </div>
                </Card>
                <Card>
                    <div style={{ width: 100, height: 200, margin: 5, backgroundColor: 'black' }}>
                        dddd
                    </div>
                </Card><Card>
                    <div style={{ width: 100, height: 200, margin: 5, backgroundColor: 'black' }}>
                        dddd
                    </div>
                </Card><Card>
                    <div style={{ width: 100, height: 200, margin: 5, backgroundColor: 'black' }}>
                        dddd
                    </div>
                </Card><Card>
                    <div style={{ width: 100, height: 200, margin: 5, backgroundColor: 'black' }}>
                        dddd
                    </div>
                </Card><Card>
                    <div style={{ width: 100, height: 200, margin: 5, backgroundColor: 'black' }}>
                        dddd
                    </div>
                </Card><Card>
                    <div style={{ width: 100, height: 200, margin: 5, backgroundColor: 'black' }}>
                        dddd
                    </div>
                </Card><Card>
                    <div style={{ width: 100, height: 200, margin: 5, backgroundColor: 'black' }}>
                        dddd
                    </div>
                </Card><Card>
                    <div style={{ width: 100, height: 200, margin: 5, backgroundColor: 'black' }}>
                        dddd
                    </div>
                </Card><Card>
                    <div style={{ width: 100, height: 200, margin: 5, backgroundColor: 'black' }}>
                        dddd
                    </div>
                </Card><Card>
                    <div style={{ width: 100, height: 200, margin: 5, backgroundColor: 'black' }}>
                        dddd
                    </div>
                </Card><Card >
                    <div style={{ width: 100, height: 200, margin: 5, backgroundColor: 'black' }}>
                        dddd
                    </div>
                </Card>
            </CardScroll>

            <CellButton centered onClick={() => store.save()}>
                Сохранить артиста
            </CellButton>

        </Group>
    )
})

export default AddArtistForm