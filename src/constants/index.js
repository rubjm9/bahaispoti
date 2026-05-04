import * as Icon from '../component/icons'
import React from 'react'

const CONSTANTS = {
  MOBILE_SIZE: 640,
}

export default CONSTANTS;

export const MENU = [
  {
    title: 'Inicio',
    path: '/',
    icon: <Icon.Home />,
    iconSelected: <Icon.HomeActive />
  },
  {
    title: 'Buscar',
    path: '/search',
    icon: <Icon.Search />,
    iconSelected: <Icon.SearchActive />
  },
  {
    title: 'Tu biblioteca',
    path: '/library',
    icon: <Icon.Library />,
    iconSelected: <Icon.LibraryActive />
  },
  {
    title: 'Favoritos',
    path: '/favorites',
    icon: <Icon.Like />,
    iconSelected: <Icon.LikeActive />
  },
  {
    title: 'Historial',
    path: '/history',
    icon: <Icon.Time />,
    iconSelected: <Icon.Time />
  }
]

export const PLAYLISTBTN = [
    {
      title: 'Crear lista de reproducción',
      path: '/',
      ImgName: 'createPlaylist',
    },
    {
      title: 'Canciones que te gustan',
      path: '/',
      ImgName: 'popularSong',
    }
]

export const LIBRARYTABS = [
  {
    title: 'Listas de reproducción',
    path: '/library'
  },
  {
    title: 'Podcasts',
    path: '/library/podcasts'
  },
  {
    title: 'Artistas',
    path: '/library/artists'
  },
  {
    title: 'Álbumes',
    path: '/library/albums'
  }
]