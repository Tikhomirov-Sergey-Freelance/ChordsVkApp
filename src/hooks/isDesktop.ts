import { useAdaptivity, ViewWidth } from '@vkontakte/vkui'

export default () => {

    const { viewWidth } = useAdaptivity()
    
    return viewWidth! >= ViewWidth.TABLET
}