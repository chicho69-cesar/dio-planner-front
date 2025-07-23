import * as WebBrowser from 'expo-web-browser'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

WebBrowser.maybeCompleteAuthSession()

export default function GoogleLogin({ onPress }) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <View style={styles.buttonContent}>
        <Image
          source={require('../../../assets/svg/google.png')}
          style={styles.image}
        />
        <Text style={styles.buttonText}>Google</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    paddingVertical: 12,
  },
  buttonContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  image: {
    height: 25,
    width: 25,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  }
})
