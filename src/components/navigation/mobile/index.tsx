import React from 'react'
import { Tabbar, TabbarItem } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import GlobalStore from '../../../stores/global-store'

import pages from '../menu'

const MobileNav: React.FC = () => {

    return (
        <Tabbar>

            {
                pages.map(page => 

                    <TabbarItem
                        key={page.key}
                        onClick={() => GlobalStore.router.setActiveStory(page.key)}
                        selected={GlobalStore.router.activeStory === page.key}
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

