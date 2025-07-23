import { useNavigation } from '@react-navigation/native'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { useSelectedEventStore } from '../../providers/event-state'

export default function SearchResult({ item }) {
  const navigation = useNavigation()
  const setSelectedEvent = useSelectedEventStore((state) => state.setSelectedEvent)

  const navigateToResult = () => {
    setSelectedEvent({ ...item })
    navigation.navigate('Event')
  }

  return (
    <View style={styles.itemContainer}>
      <Pressable onPress={() => navigateToResult(item.id)}>
        {({ pressed }) => (
          <View style={[
            styles.resultContainer,
            { borderColor: pressed ? '#9ca3af' : 'black' }
          ]}>
            <Image
              style={styles.image}
              source={{ uri: item.img }}
              alt={item.id.toString()}
            />
            <Text style={styles.title} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    width: '47%',
    marginHorizontal: '1.5%',
    marginVertical: 8,
  },
  resultContainer: {
    borderRadius: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    height: 200,
    width: '100%',
  },
  title: {
    fontSize: 18,
    color: 'black',
    width: '100%',
    textAlign: 'center',
    marginVertical: 4,
    paddingHorizontal: 4,
  }
})
