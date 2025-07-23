import { Image, StyleSheet, Text, View } from 'react-native'

export default function ColumnMemories({ memories }) {
  return (
    <View style={styles.container}>
      {memories.map((memory) => (
        <View key={memory.id} style={styles.memoryItem}>
          <Image
            style={styles.image}
            source={{ uri: memory.picture }}
            alt={memory.title}
          />

          <Text style={styles.title}>{memory.title}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
  },
  memoryItem: {
    width: '100%',
    padding: 8,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 8,
  },
  title: {
    marginTop: 4,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    width: '100%',
  }
})
