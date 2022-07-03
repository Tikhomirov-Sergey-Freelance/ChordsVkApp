import React from 'react'

import { Text } from '@vkontakte/vkui'

const OptionText: React.FC = ({ children }) => {

    return (
        <Text
            style={{
                padding: 12,
                color: 'var(--text_secondary)',
            }}
            weight="regular"
        >
            {children}
        </Text>

    )
}

export default OptionText