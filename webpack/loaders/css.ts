import { loader as minicss } from 'mini-css-extract-plugin'

import { IS_DEV } from '../env'

export default {
    client: {
        test: /\.css$/,
        use: [
            IS_DEV && 'css-hot-loader',
            minicss,
            'css-loader',      
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                      plugins: [
                        'postcss-import'
                      ]
                    }
                }
            },
        ].filter(Boolean),
    },
    server: {
        test: /\.css$/,
        loader: 'null-loader',
    },
}
