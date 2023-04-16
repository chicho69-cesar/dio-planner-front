import React, { useEffect, useState } from 'react'
import { Stack } from 'native-base'

import SearchResultsList from '../components/search/SearchResultsList'
import BottomNavigationBar from '../components/BottomNavigationBar'
import LoadingResults from '../components/search/LoadingResults'

const images = [
  {
    id: 1,
    name: 'Cesar uwu',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 2,
    name: 'Cesar uwu',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 3,
    name: 'Cesar uwu',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 4,
    name: 'Cesar uwu',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 5,
    name: 'Cesar uwu',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 6,
    name: 'Cesar uwu',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 7,
    name: 'Cesar uwu',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 8,
    name: 'Cesar uwu',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 9,
    name: 'Cesar uwu',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 10,
    name: 'Cesar uwu',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  }
]

export default function SearchScreen({ navigation, route }) {
  const [results, setResults] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setResults([...images])
    }, 3000)
  }, [])

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack h="100%" w="100%" px={4} pt={16} pb={0}>
        {results.length === 0 ? (
          <LoadingResults />
        ) : (
          <SearchResultsList results={results} />
        )}
      </Stack>

      <BottomNavigationBar active="Search" />
    </Stack>
  )
}
