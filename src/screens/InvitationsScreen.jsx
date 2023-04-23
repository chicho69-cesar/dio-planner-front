import React, { useState, useEffect } from 'react'
import { Heading, ScrollView, Stack } from 'native-base'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Invitation from '../components/invitations/Invitation'
import LoadingInvitations from '../components/invitations/LoadingInvitations'

const xd = [
  {
    id: 1,
    name: 'Cesar',
    date: new Date('2023-05-01T00:00:00'),
    description:
      'Occaecat proident tempor cupidatat mollit sunt laboris sit aute nisi dolor velit irure nostrud laborum. Qui dolor eiusmod consequat dolore mollit fugiat. Lorem commodo aliqua dolore elit deserunt tempor qui. Mollit nostrud id adipisicing deserunt qui ex.',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 2,
    name: 'Cesar',
    date: new Date('2023-05-01T00:00:00'),
    description:
      'Nulla irure adipisicing in tempor veniam et in aute tempor. Ad commodo ex deserunt eiusmod non exercitation esse dolore. Consequat eiusmod sint sunt proident eiusmod consectetur eiusmod ut minim nulla minim sit ex. Et nulla sint do adipisicing commodo velit exercitation tempor aute. Minim qui nisi commodo labore et pariatur reprehenderit. Aliqua nostrud id qui tempor sint ut ex nostrud sint dolor sint. Duis officia sint adipisicing cupidatat consectetur velit sit irure consequat amet cillum laborum occaecat.',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 3,
    name: 'Cesar',
    date: new Date('2023-05-01T00:00:00'),
    description:
      'Id consectetur magna cillum mollit ullamco sit ex. Sint sit culpa dolor consectetur aliquip voluptate cillum tempor cillum aute irure sint laboris duis. Ipsum eiusmod tempor enim dolore nulla anim. Nisi ea occaecat est tempor consectetur adipisicing ea commodo sit dolor Lorem nisi ad.',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 4,
    name: 'Cesar',
    date: new Date('2023-05-01T00:00:00'),
    description:
      'Elit eu nulla eu pariatur ut ut proident eiusmod reprehenderit laborum qui quis aliqua sunt. Excepteur pariatur deserunt do voluptate irure reprehenderit commodo duis fugiat officia sunt et. Ipsum magna irure laborum consequat est. Do officia sunt ad fugiat tempor id ullamco velit consectetur. Lorem id labore consectetur consequat ullamco. Cillum occaecat qui consectetur eu nostrud. Tempor in sit ipsum non voluptate sunt elit exercitation irure.',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  },
  {
    id: 5,
    name: 'Cesar',
    date: new Date('2023-05-01T00:00:00'),
    description:
      'Culpa nulla amet aute dolore eu nostrud dolore quis fugiat reprehenderit labore. Commodo reprehenderit quis anim in. Id fugiat esse consectetur eiusmod eu sint sit sunt dolore nisi consectetur. Mollit reprehenderit culpa anim laborum quis magna sint enim.',
    img: 'https://i.pinimg.com/564x/9c/a6/82/9ca682558293bc3976154e317091a9c9.jpg'
  }
]

export default function InvitationsScreen({ navigation, route }) {
  const [events, setEvents] = useState([])

  useEffect(() => {
    setTimeout(() => {
      setEvents([...xd])
    }, 3000)
  }, [])

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

          {events.length === 0
            ? [1, 2, 3].map((event) => <LoadingInvitations key={event} />)
            : events.map((event) => (
                <Invitation key={event.id} event={event} />
              ))}
        </ScrollView>
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
