import React from 'react'
import { Tabbar, TabbarItem } from '@vkontakte/vkui'
import { observer } from 'mobx-react-lite'

import { Router } from 'stores/root-store'

import pages from '../menu'

const MobileNav: React.FC = () => {

    return (
        <Tabbar>

            {
                pages.map(page => 

                    <TabbarItem
                        key={page.key}
                        onClick={() => Router.setActiveStory(page.key)}
                        selected={Router.activeStory === page.key}
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

