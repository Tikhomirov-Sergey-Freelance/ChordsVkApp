import React from 'react'
import { Icon28PlaylistOutline, Icon28MusicOutline, Icon28LikeOutline, Icon28AddSquareOutline, Icon28SettingsOutline } from '@vkontakte/icons'
import { JsxElement } from 'typescript'
import { Global } from 'stores/root-store'

export type iPageKey = 'tracks' | 'chords' | 'favourites' | 'proposeTrack' | 'admin'

export interface iPage {
  key: iPageKey
  name: string
  iconComponent: JSX.Element
}

const pages: iPage[] = [
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
    name: 'Моя коллекция',
    iconComponent: <Icon28LikeOutline />
  },
  {
    key: 'proposeTrack',
    name: 'Предложить трек',
    iconComponent: <Icon28AddSquareOutline />
  },
]

const adminPages: iPage[] = [
  {
    key: 'admin',
    name: 'Администрирование',
    iconComponent: <Icon28SettingsOutline />
  }
]

if (Global.isAdmin) {
  pages.push(...adminPages)
}

export default pages


