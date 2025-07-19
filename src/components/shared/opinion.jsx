import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

export default function Opinion({ opinion }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.author}>{opinion.autor}</Text>
        <View style={styles.rating}>
          {[1, 2, 3, 4, 5].map((totalGrade) => (
            <MaterialIcons
              key={totalGrade}
              name="star-rate"
              size={16}
              color={totalGrade <= opinion.grade ? '#d97706' : 'black'}
            />
          ))}
        </View>
      </View>
      <Text style={styles.comment}>{opinion.opinion}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#475569',
    borderRadius: 6,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: '#4b5563',
    fontStyle: 'italic',
  },
  rating: {
    flexDirection: 'row',
    gap: 4,
  },
  comment: {
    width: '100%',
    fontSize: 16,
    color: 'black',
  }
})
