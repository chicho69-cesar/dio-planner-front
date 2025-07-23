import { Image, StyleSheet, Text, View } from 'react-native'

export default function Guest({ guest }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: guest.picture }}
        alt={guest.name}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {guest.name}
        </Text>
        <Text style={styles.status}>
          {guest.status}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 6,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 6,
  },
  infoContainer: {
    width: '65%',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  status: {
    fontSize: 16,
    color: '#f59e0b',
    fontWeight: 'bold',
  }
})
