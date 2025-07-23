import DateTimePicker from '@react-native-community/datetimepicker'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import * as TodoEndpoints from '../api/todo'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import ButtonAction from '../components/shared/button-action'
import Todo from '../components/todo-list/todo'
import { useSelectedEventStore } from '../providers/event-state'
import { getPickedDate } from '../utils/dates'

export default function TodoListScreen() {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)

  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState('')
  const [pickedDate, setPickedDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editTodo, setEditTodo] = useState({})

  const getTodosFunc = async (eventID) => {
    const response = await TodoEndpoints.getTodos(eventID)

    if (response) {
      setTodos([
        ...response.map((todo) => {
          return {
            id: todo.id,
            text: todo.text,
            date: new Date(todo.date),
            complete: todo.complete,
            eventID: todo.eventID
          }
        })
      ])

      setIsLoading(false)
    }
  }

  useEffect(() => {
    getTodosFunc(selectedEvent.id)
  }, [selectedEvent])

  const onChangeTodo = (text) => {
    setTodoText(text)
  }

  const onChangeDate = (event, date) => {
    if (date) {
      setShowCalendar(false)
      setPickedDate(date)
    }
  }

  const addTodoMut = useMutation({
    mutationFn: async (values) => {
      const todo = await TodoEndpoints.addTodo(
        values.text,
        values.date,
        values.complete,
        values.eventID
      )

      if (todo) {
        setTodos([
          {
            id: todo.id,
            text: todo.text,
            date: new Date(todo.date),
            complete: todo.complete,
            eventID: todo.eventID
          },
          ...todos
        ])

        setIsLoading(false)
      }
    }
  })

  const updateTodoMut = useMutation({
    mutationFn: async (values) => {
      const todoUpdated = await TodoEndpoints.updateTodo(
        values.id,
        values.text,
        values.date,
        values.complete
      )

      if (todoUpdated) {
        setTodos(
          todos.map((todo) => {
            if (todo.id === values.id) {
              return {
                id: todoUpdated.id,
                text: todoUpdated.text,
                date: new Date(todoUpdated.date),
                complete: todoUpdated.complete,
                eventID: todoUpdated.eventID
              }
            }
            return todo
          })
        )
        setIsLoading(false)
      }
    }
  })

  const deleteTodoMut = useMutation({
    mutationFn: async (values) => {
      const isDeleted = await TodoEndpoints.deleteTodo(values.id)
      if (isDeleted) {
        setTodos(todos.filter((todo) => todo.id !== values.id))
      }
    }
  })

  const onHandleComplete = (id) => {
    const todoFounded = todos.find((todo) => todo.id === id)

    updateTodoMut.mutate({
      id: todoFounded.id,
      text: todoFounded.text,
      date: todoFounded.date,
      complete: !todoFounded.complete
    })
  }

  const onHandleEdit = (id) => {
    let editedTodo = todos.find((todo) => todo.id === id)

    setEdit(true)
    setEditTodo(editedTodo)
    setTodoText(editedTodo.text)
    setPickedDate(editedTodo.date)
  }

  const onHandleDelete = (id) => {
    deleteTodoMut.mutate({ id: id })
  }

  const addTodo = () => {
    addTodoMut.mutate({
      text: todoText,
      date: pickedDate,
      complete: false,
      eventID: selectedEvent.id
    })
  }

  const updateTodo = () => {
    updateTodoMut.mutate({
      id: editTodo.id,
      text: todoText,
      date: pickedDate,
      complete: false
    })
  }

  const onHandleSubmit = () => {
    if (todoText === '') {
      return
    }

    setIsLoading(true)
    edit ? updateTodo() : addTodo()

    setEdit(false)
    setEditTodo({})
    setTodoText('')
    setPickedDate(new Date())
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Agrega más tareas</Text>

          <TextInput
            value={todoText}
            style={styles.textArea}
            multiline
            placeholder="Tarea..."
            onChangeText={onChangeTodo}
          />

          <ButtonAction
            text={getPickedDate(pickedDate)}
            icon="calendar"
            onPress={() => setShowCalendar(true)}
          />

          {showCalendar && (
            <DateTimePicker
              value={pickedDate}
              mode="date"
              onChange={onChangeDate}
            />
          )}

          <TouchableOpacity style={styles.button} onPress={onHandleSubmit}>
            <Text style={styles.buttonText}>{edit ? 'Editar' : 'Agregar'}</Text>
          </TouchableOpacity>

          <Text style={styles.heading}>Lista de tareas</Text>

          {isLoading ? (
            <ActivityIndicator style={styles.loader} size="large" color="#f59e0b" />
          ) : (
            todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onComplete={onHandleComplete}
                onEdit={onHandleEdit}
                onDelete={onHandleDelete}
              />
            ))
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
  content: {
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
  heading: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    marginTop: 8
  },
  textArea: {
    width: '90%',
    height: 80,
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: 'white',
    color: '#1e293b',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8
  },
  button: {
    width: '50%',
    padding: 12,
    marginBottom: 12,
    alignSelf: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16
  },
  loader: {
    marginTop: 16
  }
})
