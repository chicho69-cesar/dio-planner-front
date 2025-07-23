import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { getUser } from '../../api/user.js'
import { useAuth } from '../../hooks/use-auth.js'
import { useUserLoggedStore } from '../../providers/user-state.js'

export default function ProfileInformation({ nOfEvents }) {
  const navigation = useNavigation()
  const { logout } = useAuth()

  const userLogged = useUserLoggedStore((state) => state.userLogged)

  const [userId] = useState(userLogged.ID)
  const [userInfo, setUserInfo] = useState({
    name: '',
    description: '',
    email: '',
    picture: 'https://dio-planner.s3.us-east-2.amazonaws.com/no-image.jpg'
  })

  const getUserFunc = async (ID) => {
    const response = await getUser(ID)

    if (response) {
      setUserInfo({
        name: response.name,
        description: response.description,
        email: response.email,
        picture: response.picture
      })
    }
  }

  useEffect(() => {
    getUserFunc(userId)
  }, [userId])

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: userInfo?.picture }}
            alt={userInfo?.name}
          />

          <Pressable
            style={styles.invitationsButton}
            onPress={() => navigation.navigate('Invitations')}
          >
            <Text style={styles.invitationsText}>Invitaciones</Text>
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>{userInfo?.name}</Text>
          <Text style={styles.email} numberOfLines={1}>
            {userInfo?.email ?? ''}
          </Text>
          <Text style={styles.description}>
            {userInfo?.description ?? ''}
          </Text>

          <View style={styles.eventsContainer}>
            <Text style={styles.eventsCount}>{nOfEvents} eventos</Text>
            <Pressable
              style={styles.editButton}
              onPress={() => navigation.navigate('EditInfo')}
            >
              <MaterialCommunityIcons name="pencil-outline" size={24} color="#374151" />
            </Pressable>
          </View>

          <Pressable
            style={styles.logoutButton}
            onPress={() => {
              logout()
              navigation.navigate('Login')
            }}
          >
            <View style={styles.logoutContent}>
              <MaterialCommunityIcons name="power" size={24} color="white" />
              <Text style={styles.logoutText}>Logout</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <Text style={styles.eventsTitle}>Mis eventos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  profileContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingTop: 12,
    gap: 12,
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '30%',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  invitationsButton: {
    marginTop: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
  },
  invitationsText: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
  },
  infoContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    width: '100%',
  },
  email: {
    fontSize: 14,
    color: '#1e293b',
    width: '100%',
  },
  description: {
    color: '#374151',
    fontSize: 14,
    width: '100%',
  },
  eventsContainer: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  eventsCount: {
    color: 'black',
    fontSize: 18,
  },
  editButton: {
    backgroundColor: '#e5e7eb',
    padding: 6,
    borderRadius: 20,
  },
  logoutButton: {
    width: '100%',
    marginTop: 16,
    backgroundColor: '#b91c1c',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  eventsTitle: {
    color: '#1e293b',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
  }
})
