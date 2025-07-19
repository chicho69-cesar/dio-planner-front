import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function FormAction({ bg, color, text, w, onPress }) {
  return (
    <Pressable style={{ width: w }} onPress={onPress}>
      {({ pressed }) => (
        <View style={[
          styles.container,
          {
            backgroundColor: bg,
            shadowOpacity: pressed ? 0 : 0.25,
          }
        ]}>
          <Text style={[styles.text, { color }]}>{text}</Text>
        </View>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3.84,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  }
})
