import { StyleSheet, View } from 'react-native'

export default function LoadingEvent({ item }) {
  return (
    <View style={styles.container} key={item}>
      <View style={styles.content}>
        <View style={styles.imagePlaceholder} />
        
        <View style={styles.textContainer}>
          <View style={styles.titlePlaceholder} />
          <View style={styles.datePlaceholder} />
          <View style={styles.descriptionPlaceholder} />
          <View style={styles.descriptionPlaceholder} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
  },
  imagePlaceholder: {
    height: 200,
    width: 150,
    backgroundColor: '#4b5563',
  },
  textContainer: {
    width: '54%',
    padding: 8,
  },
  titlePlaceholder: {
    height: 20,
    borderRadius: 4,
    backgroundColor: '#4b5563',
    marginBottom: 8,
  },
  datePlaceholder: {
    height: 20,
    borderRadius: 10,
    backgroundColor: '#f59e0b',
    marginBottom: 32,
    width: '50%',
  },
  descriptionPlaceholder: {
    height: 16,
    borderRadius: 4,
    backgroundColor: '#4b5563',
    marginBottom: 8,
  }
})
