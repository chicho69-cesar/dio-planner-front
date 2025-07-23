import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'

import { getAllMemories } from '../api/memory'
import ColumnMemories from '../components/memories/column-memories'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import ButtonAction from '../components/shared/button-action'
import { useSelectedEventStore } from '../providers/event-state'

export default function MemoriesScreen({ navigation }) {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)

  const [memories, setMemories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getMemoriesFunc = async (ID) => {
    const response = await getAllMemories(ID)

    if (response) {
      setMemories(response.map((memory) => ({
        id: memory.id,
        title: memory.title,
        picture: memory.picture,
        eventID: memory.eventID
      })))

      setIsLoading(false)
    }
  }

  useEffect(() => {
    getMemoriesFunc(selectedEvent.id)
  }, [selectedEvent])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>
            Los recuerdos de <Text style={styles.eventName}>{selectedEvent.name}</Text>
          </Text>

          <View style={styles.memoriesContainer}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#f59e0b" />
              </View>
            ) : memories.length === 0 ? (
              <Text style={styles.emptyText}>No hay recuerdos en {selectedEvent.name}</Text>
            ) : (
              <>
                <ColumnMemories memories={memories.filter((_, index) => index % 2 === 0)} />
                <ColumnMemories memories={memories.filter((_, index) => index % 2 !== 0)} />
              </>
            )}
          </View>

          <ButtonAction
            text="Comparte un recuerdo"
            icon="share-variant"
            onPress={() => navigation.navigate('ShareMemory')}
          />

          <View style={{ height: 70 }} />
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
  },
  content: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 16,
  },
  memoriesContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loadingContainer: {
    width: '100%',
    height: 384,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    marginTop: 48,
  },
})
