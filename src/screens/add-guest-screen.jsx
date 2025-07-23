import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native'

import { searchTheGuests } from '../api/guest'
import BasicTitle from '../components/add-guest/basic-title'
import CompletedSearch from '../components/add-guest/complete-search'
import Searching from '../components/add-guest/searching'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import { useUserLoggedStore } from '../providers/user-state'

export default function AddGuestScreen() {
  const userLogged = useUserLoggedStore((state) => state.userLogged)

  const [userId] = useState(userLogged.ID)
  const [state, setState] = useState('basic') // basic | searching | completed
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  const doSearch = async (name) => {
    const response = await searchTheGuests(name)

    if (response) {
      setResults([
        ...response.filter((result) => {
          if (result.id === userId) return null
          return {
            id: result.id,
            name: result.name,
            description: result.description,
            picture: result.picture
          }
        })
      ])

      setState('completed')
    } else {
      console.error('ERROR AL BUSCAR')
    }
  }

  const onSearchHandle = (text) => {
    setSearch(text)
  }

  const handleSearch = async () => {
    setState('searching')
    await doSearch(search)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="John..."
              placeholderTextColor="#64748b"
              value={search}
              onChangeText={onSearchHandle}
              onFocus={() => setState('basic')}
            />

            <Pressable
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Ionicons name="search" size={24} color="#1e293b" />
            </Pressable>
          </View>

          {state === 'basic' && <BasicTitle />}
          {state === 'searching' && <Searching />}
          {state === 'completed' && <CompletedSearch results={results} />}
        </ScrollView>
      </View>

      <BottomNavigationBar active="Home" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: '80%',
    color: '#1e293b',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})
