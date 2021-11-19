import React from 'react'
import { Icon28PlaylistOutline, Icon28MusicOutline, Icon28FavoriteOutline, Icon28AddSquareOutline, Icon28SettingsOutline } from '@vkontakte/icons'
import { JsxElement } from 'typescript'

export type iPageKey = 'tracks' | 'chords' | 'favourites' | 'addTrack' | 'admin'

export interface iPage {
  key: iPageKey
  name: string
  iconComponent: JSX.Element
}

export const pages: iPage[] = [
    {
        key: 'tracks',
        name: 'Треки',
        iconComponent: <Icon28PlaylistOutline />
    },
    {
      key: 'chords',
      name: 'Аккорды',
      iconComponent: <Icon28MusicOutline />
    },
    {
      key: 'favourites',
      name: 'Избранное',
      iconComponent: <Icon28FavoriteOutline />
    },
    {
      key: 'addTrack',
      name: 'Добавить трек',
      iconComponent: <Icon28AddSquareOutline />
    },
    {
      key: 'admin',
      name: 'Администрирование',
      iconComponent: <Icon28SettingsOutline />
    }
]

