import React, { useEffect, useState } from 'react'
import {
  FormControl,
  Button,
  HStack,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Stack,
  TextArea
} from 'native-base'
import BottomNavigationBar from '../components/BottomNavigationBar'
import { MaterialIcons } from '@expo/vector-icons'
import EventGrade from '../components/EventGrade'
import Opinion from '../components/Opinion'
import CustomDivider from '../components/CustomDivider'

export default function EventGradeScreen({ navigation, route }) {
  const [opinions, setOpinions] = useState([])
  const [avgGrade, setAvgGrade] = useState(0)
  const [myGrade, setMyGrade] = useState(0)
  const [opinion, setOpinion] = useState('')

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

  const onSubmit = () => {
    setOpinions([
      {
        id: opinions.length,
        grade: myGrade,
        opinion: opinion,
        autor: 'Cesar Villalobos'
      },
      ...opinions
    ])
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
              colorScheme="amber"
              bg="amber.400"
              onPress={onSubmit}
            >
              Opinar
            </Button>
          </HStack>

          {opinions.length > 0 && <CustomDivider />}

          {opinions.map((op) => (
            <Opinion key={op.id} opinion={op} />
          ))}
        </ScrollView>
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
