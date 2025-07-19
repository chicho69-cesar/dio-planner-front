import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { useSelectedEventStore } from '../../providers/event-state'
import { useSearchStore } from '../../providers/search-state'

export function HomeHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Próximos eventos</Text>
      <HeaderLogo />
    </View>
  )
}

export function SearchHeader() {
  const setTextSearch = useSearchStore((state) => state.setSearchState)
  const setDoSearch = useSearchStore((state) => state.setDoSearchState)

  return (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar evento"
        placeholderTextColor="#64748b"
        onChangeText={setTextSearch}
      />

      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => setDoSearch(true)}
      >
        <Ionicons name="search" size={20} color="#1e293b" />
      </TouchableOpacity>
    </View>
  )
}

export function TopsHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Eventos top</Text>
      <HeaderLogo />
    </View>
  )
}

export function ProfileHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Mi perfil publico</Text>
      <HeaderLogo />
    </View>
  )
}

export function CreateEventHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Crear evento</Text>
      <HeaderLogo />
    </View>
  )
}

export function InvitationsHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Mis invitaciones</Text>
      <HeaderLogo />
    </View>
  )
}

export function EditInfoHeader() {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Edita tu información</Text>
      <HeaderLogo />
    </View>
  )
}

export function EventHeader() {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)

  return (
    <View style={styles.eventHeaderContainer}>
      <Image
        style={styles.eventImage}
        source={{ uri: selectedEvent.img }}
        alt={selectedEvent.name}
      />
      <Text style={styles.eventTitle} numberOfLines={1}>
        {selectedEvent.name}
      </Text>
    </View>
  )
}

function HeaderLogo() {
  return (
    <Text style={styles.logoText}>D</Text>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  searchInput: {
    width: '80%',
    height: 40,
    color: '#1e293b',
    fontSize: 16,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 12,
  },
  eventImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  eventTitle: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  logoText: {
    fontSize: 24,
    paddingHorizontal: 8,
    color: 'white',
    fontStyle: 'italic',
    fontWeight: 'bold',
  }
})
