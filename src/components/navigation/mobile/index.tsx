import React from 'react'
import { Tabbar, TabbarItem } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import isDesktopHook from '../../../hooks/isDesktop'
import GlobalStore from '../../../stores/global-store'

import { pages } from '../../../pages'

const MobileNav: React.FC = observer(() => {

    const isDesktop = isDesktopHook()

    if(isDesktop) return null

    return (
        <Tabbar>

            {
                pages.map(page => 

                    <TabbarItem
                        key={page.key}
                        onClick={() => GlobalStore.setActiveStory(page.key)}
                        selected={GlobalStore.activeStory === page.key}
                        data-story={page.key}
                        text={page.name}
                    >
                        {page.iconComponent}
                    </TabbarItem>
                )
            }

        </Tabbar>
    )
})

export default MobileNav

