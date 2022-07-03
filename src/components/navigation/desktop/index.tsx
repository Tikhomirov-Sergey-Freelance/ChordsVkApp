import React from 'react'
import { Cell, Group, Panel, PanelHeader, SplitCol } from '@vkontakte/vkui'

import isDesktopHook from '../../../hooks/isDesktop'
import GlobalStore from '../../../stores/root/global-store'

import { pages } from '../menu'
import { observer } from 'mobx-react-lite'

const activeLinkStyle = {
  backgroundColor: 'var(--button_secondary_background)',
  borderRadius: 8
}

const DesktopNav: React.FC = observer(() => {

  const isDesktop = isDesktopHook()

  if(!isDesktop) return null
  
  return (
    <SplitCol fixed width="280px" maxWidth="280px">
      <Panel>
        <PanelHeader />
        <Group>

          {
            pages.map(page => 

              <Cell
                key={page.key}
                onClick={() => GlobalStore.setActiveStory(page.key)}
                disabled={GlobalStore.activeStory === page.key}
                style={GlobalStore.activeStory === page.key ? activeLinkStyle : {}}
                data-story={page.key}
                before={page.iconComponent}
              >
                {page.name}
              </Cell>

            )
          }

        </Group>
      </Panel>
    </SplitCol>
  )
})

export default DesktopNav