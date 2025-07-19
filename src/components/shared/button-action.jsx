import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function ButtonAction({ text, icon, onPress }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={onPress}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>{text}</Text>

          <MaterialCommunityIcons
            name={icon}
            size={24}
            color="#4b5563"
            style={styles.buttonIcon}
          />
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  button: {
    width: '90%',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  buttonContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#1f2937',
  },
  buttonIcon: {
    fontWeight: 'bold',
  }
})
