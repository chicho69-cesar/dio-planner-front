import { Heading, ScrollView, Stack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { getInvitations } from '../api/guest'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Invitation from '../components/invitations/Invitation'
import LoadingInvitations from '../components/invitations/LoadingInvitations'
import { userLoggedState } from '../providers/user-state'

export default function InvitationsScreen() {
  const [userLogged] = useRecoilState(userLoggedState)

  const [userId] = useState(userLogged.ID)
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState([])

  const getInvitationsFunc = async (ID) => {
    const response = await getInvitations(ID)

    if (response) {
      console.log(response)
      setEvents([
        ...response.map((invitation) => {
          return {
            id: invitation.id,
            name: invitation.name,
            date: new Date(invitation.date),
            description: invitation.description,
            img: invitation.img
          }
        })
      ])

      setIsLoading(false)
    } else {
      console.error('Error al cargar los invitados')
    }
  }

  useEffect(() => {
    getInvitationsFunc(userId)
  }, [userId])

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        <ScrollView w="100%" h="100%" showsVerticalScrollIndicator={false}>
          <Heading
            w="100%"
            textAlign="center"
            fontSize="xl"
            mt={4}
            mb={2}
            color="black"
          >
            Las invitaciones pendientes
          </Heading>

          {isLoading ? (
            [1, 2, 3].map((event) => <LoadingInvitations key={event} />)
          ) : events.length === 0 ? (
            <Heading fontSize="2xl" color="black" textAlign="center" mt={12}>
              No tienes ninguna invitación pendiente
            </Heading>
          ) : (
            events.map((event) => <Invitation key={event.id} event={event} />)
          )}
        </ScrollView>
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
