import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { getInvitations } from '../api/guest'
import Invitation from '../components/invitations/invitation'
import LoadingInvitations from '../components/invitations/loading-invitations'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import { useUserLoggedStore } from '../providers/user-state'

export default function InvitationsScreen() {
  const userLogged = useUserLoggedStore((state) => state.userLogged)

  const [userId] = useState(userLogged.ID)
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([])

  const getInvitationsFunc = async (ID) => {
    const response = await getInvitations(ID)

    if (response) {
      setEvents(response.map((invitation) => ({
        id: invitation.id,
        name: invitation.name,
        date: new Date(invitation.date),
        description: invitation.description,
        img: invitation.img
      })))

      setIsLoading(false)
    } else {
      console.error('Error al cargar los invitados')
    }
  }

  useEffect(() => {
    getInvitationsFunc(userId)
  }, [userId])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Las invitaciones pendientes</Text>

          {isLoading ? (
            [1, 2, 3].map((event) => <LoadingInvitations key={event} />)
          ) : events.length === 0 ? (
            <Text style={styles.emptyText}>No tienes ninguna invitación pendiente</Text>
          ) : (
            events.map((event) => <Invitation key={event.id} event={event} />)
          )}
        </ScrollView>
      </View>

      <BottomNavigationBar active="Profile" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  scrollView: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginTop: 48,
  },
})
