import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getEventsByQuery } from '../api/event'
import LoadingResults from '../components/search/loading-results'
import SearchResultsList from '../components/search/search-result-list'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import { useSearchStore } from '../providers/search-state'

export default function SearchScreen() {
  const textSearch = useSearchStore((state) => state.searchState)
  const doSearch = useSearchStore((state) => state.doSearchState)
  const setDoSearch = useSearchStore((state) => state.setDoSearchState)

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
    <View style={styles.container}>
      <View style={styles.content}>
        {isLoading && !doSearch ? (
          <Text style={styles.heading}>Busca un evento</Text>
        ) : isLoading && doSearch ? (
          <LoadingResults />
        ) : results.length === 0 ? (
          <Text style={styles.heading}>No se encontró ninguna coincidencia</Text>
        ) : (
          <SearchResultsList results={results} />
        )}
      </View>

      <BottomNavigationBar active="Search" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0
  },
  heading: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginTop: 48
  }
})
