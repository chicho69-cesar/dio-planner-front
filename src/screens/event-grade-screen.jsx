import { MaterialIcons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import { addGrade, getGrades } from '../api/grade'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import CustomDivider from '../components/shared/custom-divider'
import EventGrade from '../components/shared/event-grade'
import Opinion from '../components/shared/opinion'
import { useSelectedEventStore } from '../providers/event-state'
import { useUserLoggedStore } from '../providers/user-state'

export default function EventGradeScreen() {
  const userLogged = useUserLoggedStore((state) => state.userLogged)
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)

  const [userId] = useState(userLogged.ID)
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

  const addGradeMut = useMutation({
    mutationFn: async (values) => {
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
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <EventGrade grade={avgGrade.toFixed(2)} />

          <Text style={styles.title}>Califica el evento</Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((chooseGrade) => (
              <Pressable
                key={chooseGrade}
                onPress={() => onHandleGrade(chooseGrade)}
                style={styles.starButton}
              >
                <MaterialIcons
                  name="star-rate"
                  size={32}
                  color={chooseGrade <= myGrade ? '#d97706' : 'black'}
                />
              </Pressable>
            ))}
          </View>

          <View style={styles.formControl}>
            <TextInput
              value={opinion}
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder="Me parece que..."
              onChangeText={onHandleOpinion}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={onSubmit}
            >
              <Text style={styles.buttonText}>Opinar</Text>
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#d97706" />
            </View>
          ) : (
            <>
              {opinions.length > 0 && <CustomDivider />}

              {opinions.map((op) => (
                <Opinion key={op.id} opinion={op} />
              ))}
            </>
          )}
        </ScrollView>
      </View>

      <BottomNavigationBar active="Home" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0
  },
  scrollView: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 12,
    width: '100%',
    textAlign: 'center'
  },
  starsContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  starButton: {
    padding: 4
  },
  formControl: {
    width: '100%'
  },
  textArea: {
    width: '100%',
    height: 96,
    marginVertical: 12,
    backgroundColor: 'white',
    color: '#1e293b',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlignVertical: 'top'
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: '50%',
    height: 40,
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
  loadingContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  }
})
