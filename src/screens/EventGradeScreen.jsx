import {
  Button,
  FormControl,
  HStack,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Spinner,
  Stack,
  TextArea
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import { MaterialIcons } from '@expo/vector-icons'
import { addGrade, getGrades } from '../api/grade'
import BottomNavigationBar from '../components/BottomNavigationBar'
import CustomDivider from '../components/CustomDivider'
import EventGrade from '../components/EventGrade'
import Opinion from '../components/Opinion'
import { useAuth } from '../hooks/useAuth'
import { selectedEventState } from '../providers/event-state'

export default function EventGradeScreen({ navigation, route }) {
  const { user } = useAuth()
  const [selectedEvent] = useRecoilState(selectedEventState)

  const [userId] = useState(user.ID)
  const [isLoading, setIsLoading] = useState(true)
  const [opinions, setOpinions] = useState([])
  const [avgGrade, setAvgGrade] = useState(0)
  const [myGrade, setMyGrade] = useState(0)
  const [opinion, setOpinion] = useState('')

  const getGradesFunc = async (eventID) => {
    const response = await getGrades(eventID)

    if (response) {
      setOpinions([
        ...response.map((grade) => {
          return {
            id: grade.id,
            opinion: grade.opinion,
            grade: grade.grade,
            autor: grade.user,
            eventID: grade.eventID,
            userID: grade.userID
          }
        })
      ])

      setIsLoading(false)
    }
  }

  useEffect(() => {
    getGradesFunc(selectedEvent.id)
  }, [selectedEvent])

  useEffect(() => {
    if (opinions.length === 0) {
      setAvgGrade(0)
    } else {
      setAvgGrade(
        opinions.reduce((acc, op) => acc + op.grade, 0) / opinions.length
      )
    }

    setMyGrade(0)
    setOpinion('')
  }, [opinions])

  const onHandleGrade = (grade) => {
    setMyGrade(grade)
  }

  const onHandleOpinion = (text) => {
    setOpinion(text)
  }

  const addGradeMut = useMutation(async (values) => {
    const grade = await addGrade(
      values.opinion,
      values.grade,
      values.eventID,
      values.userID
    )

    if (grade) {
      console.log(grade)
      setOpinions([
        {
          id: grade.id,
          opinion: grade.opinion,
          grade: grade.grade,
          autor: grade.user,
          eventID: grade.eventID,
          userID: grade.userID
        },
        ...opinions
      ])

      setIsLoading(false)
    } else {
      console.error('Error al agregar la calificación')
    }
  })

  const onSubmit = () => {
    setIsLoading(true)
    addGradeMut.mutate({
      opinion: opinion,
      grade: myGrade,
      eventID: selectedEvent.id,
      userID: userId
    })
  }

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        <ScrollView w="100%" h="100%" showsVerticalScrollIndicator={false}>
          <EventGrade grade={avgGrade.toFixed(2)} />

          <Heading size="md" color="black" my={3} w="100%" textAlign="center">
            Califica el evento
          </Heading>

          <HStack
            w="100%"
            justifyContent="center"
            space={1}
            alignItems="center"
          >
            {[1, 2, 3, 4, 5].map((chooseGrade) => (
              <Pressable
                key={chooseGrade}
                onPress={() => onHandleGrade(chooseGrade)}
              >
                <Icon
                  as={<MaterialIcons name="star-rate" />}
                  size={16}
                  color={chooseGrade <= myGrade ? 'yellow.600' : 'black'}
                  fontWeight="bold"
                />
              </Pressable>
            ))}
          </HStack>

          <FormControl w="100%">
            <TextArea
              value={opinion}
              w={{ base: '100%', md: '25%' }}
              h={24}
              my={3}
              bg="white"
              color="coolGray.800"
              fontSize="md"
              placeholder="Me parece que..."
              onChangeText={onHandleOpinion}
              variant="outline"
              rounded="md"
              py="2"
              px="3"
              focusOutlineColor="coolGray.800"
            />
          </FormControl>

          <HStack w="100%" justifyContent="center">
            <Button
              size="md"
              w="50%"
              rounded="md"
              mb={3}
              shadow={2}
              colorScheme="coolGray"
              bg="coolGray.800"
              onPress={onSubmit}
            >
              Opinar
            </Button>
          </HStack>

          {isLoading ? (
            <HStack w="100%" justifyContent="center" mt={4}>
              <Spinner size="lg" color="amber.500" />
            </HStack>
          ) : (
            <>
              {opinions.length > 0 && <CustomDivider />}

              {opinions.map((op) => (
                <Opinion key={op.id} opinion={op} />
              ))}
            </>
          )}
        </ScrollView>
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
