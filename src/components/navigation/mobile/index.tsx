import React from 'react'
import { Tabbar, TabbarItem } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import isDesktopHook from '../../../hooks/isDesktop'
import GlobalStore from '../../../stores/global-store'

import pages from '../../../pages'

const MobileNav: React.FC = () => {

    return (
        <Tabbar>

            {
                pages.map(page => 

                    <TabbarItem
                        key={page.key}
                        onClick={() => GlobalStore.setActiveStory(page.key)}
                        selected={'tracks' === page.key}
                        data-story={page.key}
                        text={page.name}
                    >
                        {page.iconComponent}
                    </TabbarItem>
                )
            }

        </Tabbar>
    )
}

export default observer(MobileNav)

