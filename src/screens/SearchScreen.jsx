import { Heading, Stack } from 'native-base'
import React, { useEffect, useState } from 'react'

import { useRecoilState } from 'recoil'
import { getEventsByQuery } from '../api/event'
import BottomNavigationBar from '../components/BottomNavigationBar'
import LoadingResults from '../components/search/LoadingResults'
import SearchResultsList from '../components/search/SearchResultsList'
import { doSearchState, searchState } from '../providers/search-state'

export default function SearchScreen({ navigation, route }) {
  const [textSearch] = useRecoilState(searchState)
  const [doSearch, setDoSearch] = useRecoilState(doSearchState)

  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const searchEventsFunc = async () => {
      if (doSearch) {
        const response = await getEventsByQuery(textSearch, textSearch)

        if (response) {
          setResults([
            ...response.map((event) => {
              return {
                id: event.id,
                name: event.name,
                date: new Date(event.date),
                description: event.description,
                img: event.img,
                location: event.location,
                topic: event.topic,
                userID: event.user_id,
                accessibility: event.accessibility
              }
            })
          ])

          setIsLoading(false)
          setDoSearch(false)
        }
      }
    }

    searchEventsFunc()
  }, [doSearch, setDoSearch, textSearch])

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack h="100%" w="100%" px={4} pt={16} pb={0}>
        {isLoading && !doSearch ? (
          <Heading fontSize="2xl" color="black" textAlign="center" mt={12}>
            Busca un evento
          </Heading>
        ) : isLoading && doSearch ? (
          <LoadingResults />
        ) : results.length === 0 ? (
          <Heading fontSize="2xl" color="black" textAlign="center" mt={12}>
            No se encontró ninguna coincidencia
          </Heading>
        ) : (
          <SearchResultsList results={results} />
        )}
      </Stack>

      <BottomNavigationBar active="Search" />
    </Stack>
  )
}
