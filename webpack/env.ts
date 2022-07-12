import { resolve } from 'path'

const IS_DEV = process.env.NODE_ENV !== 'production'
const SRC_DIR = resolve(__dirname, '..', 'src')
const DIST_DIR = resolve(__dirname, '..', 'dist')

export { IS_DEV, SRC_DIR, DIST_DIR }
