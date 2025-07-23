import { useNavigation } from '@react-navigation/native'
import { useMutation } from '@tanstack/react-query'
import { Image, StyleSheet, Text, View } from 'react-native'

import { acceptInvitation, declineInvitation } from '../../api/guest'
import { getPickedDate } from '../../utils/dates'
import CustomDivider from '../shared/custom-divider'
import FormAction from '../shared/form-action'

export default function Invitation({ event }) {
  const navigation = useNavigation()

  const acceptInvitationMut = useMutation({
    mutationFn: async (values) => {
      const isAccepted = await acceptInvitation(values.id)
      if (isAccepted) {
        navigation.push('Home')
      } else {
        navigation.goBack()
      }
    }
  })

  const declineInvitationMut = useMutation({
    mutationFn: async (values) => {
      const isDeclined = await declineInvitation(values.id)
      if (isDeclined) {
        navigation.push('Home')
      } else {
        navigation.goBack()
      }
    }
  })

  const onHandleAccept = (id) => acceptInvitationMut.mutate({ id })
  const onHandleReject = (id) => declineInvitationMut.mutate({ id })

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={{ uri: event.img }}
          alt={event.name}
        />
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>{event.name}</Text>
          <Text style={styles.date}>{getPickedDate(event.date)}</Text>
          <Text style={styles.description} numberOfLines={4}>
            {event.description}
          </Text>
        </View>
      </View>
      <CustomDivider />
      <View style={styles.actions}>
        <FormAction
          bg="#f59e0b"
          color="black"
          text="Aceptar"
          w="45%"
          onPress={() => onHandleAccept(event.id)}
        />
        <FormAction
          bg="#1e293b"
          color="white"
          text="Rechazar"
          w="45%"
          onPress={() => onHandleReject(event.id)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    marginVertical: 12,
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#475569',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  info: {
    width: '65%',
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  date: {
    fontSize: 14,
    color: '#f59e0b',
    marginBottom: 4,
  },
  description: {
    color: 'black',
    fontSize: 16,
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  }
})
