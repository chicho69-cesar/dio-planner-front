import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function BottomNavigationBar({ active }) {
  return (
    <View style={styles.container}>
      <NavBarElement
        to="Home"
        active={active === 'Home'}
        text="Inicio"
        icon="home"
      />

      <NavBarElement
        to="Search"
        active={active === 'Search'}
        text="Buscar"
        icon="search"
      />

      <NavBarElement
        to="Tops"
        active={active === 'Tops'}
        text="Tops"
        icon="stars"
      />

      <NavBarElement
        to="Profile"
        active={active === 'Profile'}
        text="Perfil"
        icon="person-outline"
      />
    </View>
  )
}

function NavBarElement({ to, active, text, icon }) {
  const navigation = useNavigation()

  return (
    <Pressable onPress={() => navigation.navigate(to)}>
      <View style={styles.navElement}>
        <MaterialIcons
          name={icon}
          size={24}
          color={active ? '#f59e0b' : 'white'}
          style={styles.navIcon}
        />

        <Text style={[
          styles.navText,
          active && styles.activeNavText,
          active && { backgroundColor: 'rgba(245, 158, 11, 0.7)' }
        ]}>
          {text}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#1e293b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navElement: {
    width: 80,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    marginRight: 8,
    fontWeight: 'bold',
  },
  navText: {
    fontSize: 12,
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1e293b',
  },
  activeNavText: {
    color: 'white',
  }
})
