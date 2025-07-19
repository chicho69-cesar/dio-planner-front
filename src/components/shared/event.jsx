import { useNavigation } from '@react-navigation/native'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { useSelectedEventStore } from '../../providers/event-state'
import { getPickedDate } from '../../utils/dates'

export default function Event({ item }) {
  const navigation = useNavigation()
  const setSelectedEvent = useSelectedEventStore((state) => state.setSelectedEvent)

  const navigateToEvent = () => {
    setSelectedEvent({ ...item })
    navigation.navigate('Event')
  }

  return (
    <Pressable onPress={navigateToEvent}>
      {({ pressed }) => (
        <View style={[
          styles.container,
          { borderColor: pressed ? '#9ca3af' : 'black' }
        ]}>
          <View style={styles.content}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: item.img }}
              alt={item.name}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.date}>
                {getPickedDate(item.date)}
              </Text>
              <Text style={styles.description} numberOfLines={4}>
                {item.description}
              </Text>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: '40%',
    height: 200,
  },
  textContainer: {
    width: '55%',
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  date: {
    fontSize: 14,
    color: '#f59e0b',
    marginBottom: 20,
  },
  description: {
    color: 'black',
    fontSize: 16,
  }
})
