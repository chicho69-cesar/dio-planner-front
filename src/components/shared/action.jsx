import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, StyleSheet } from 'react-native'

export default function Action({ onPress, icon, bg, color }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.pressable, { backgroundColor: bg }]}
    >
      <MaterialIcons
        name={icon}
        size={20}
        color={color}
        style={styles.icon}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: {
    padding: 4,
    borderRadius: 2,
  },
  icon: {
    fontWeight: 'bold',
  }
})
