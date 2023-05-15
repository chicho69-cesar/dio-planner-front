import DateTimePicker from '@react-native-community/datetimepicker'
import {
  Button,
  FormControl,
  HStack,
  Heading,
  ScrollView,
  Spinner,
  Stack,
  TextArea
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import * as TodoEndpoints from '../api/todo'
import BottomNavigationBar from '../components/BottomNavigationBar'
import ButtonAction from '../components/ButtonAction'
import Todo from '../components/todo-list/Todo'
import { selectedEventState } from '../providers/event-state'
import { getPickedDate } from '../utilities/getTextDateES'

export default function TodoListScreen({ navigation, route }) {
  const [selectedEvent] = useRecoilState(selectedEventState)

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

  const addTodoMut = useMutation(async (values) => {
    const todo = await TodoEndpoints.addTodo(
      values.text,
      values.date,
      values.complete,
      values.eventID
    )

    if (todo) {
      console.log(todo)
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
    } else {
      console.error('Error al agregar la tarea')
    }
  })

  const updateTodoMut = useMutation(async (values) => {
    const todoUpdated = await TodoEndpoints.updateTodo(
      values.id,
      values.text,
      values.date,
      values.complete
    )

    if (todoUpdated) {
      console.log(todoUpdated)
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
    } else {
      console.error('Error al actualizar la tarea')
    }
  })

  const deleteTodoMut = useMutation(async (values) => {
    const isDeleted = await TodoEndpoints.deleteTodo(values.id)

    if (isDeleted) {
      console.log(isDeleted)
      setTodos(todos.filter((todo) => todo.id !== values.id))
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
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        <ScrollView w="100%" h="100%" showsVerticalScrollIndicator={false}>
          <Heading
            w="100%"
            textAlign="center"
            fontSize="lg"
            color="black"
            mt={4}
          >
            Agrega más tareas
          </Heading>

          <FormControl w="100%">
            <HStack w="100%" justifyContent="center">
              <TextArea
                value={todoText}
                w={{ base: '90%', md: '25%' }}
                h={20}
                mt={3}
                bg="white"
                color="coolGray.800"
                fontSize="md"
                placeholder="Tarea..."
                onChangeText={onChangeTodo}
                variant="outline"
                rounded="md"
                py="2"
                px="3"
                focusOutlineColor="coolGray.800"
              />
            </HStack>
          </FormControl>

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

          <HStack w="100%" justifyContent="center">
            <Button
              size="md"
              w="50%"
              rounded="md"
              mb={3}
              shadow={2}
              colorScheme="coolGray"
              bg="coolGray.800"
              onPress={onHandleSubmit}
            >
              {edit ? 'Editar' : 'Agregar'}
            </Button>
          </HStack>

          <Heading
            w="100%"
            textAlign="center"
            fontSize="lg"
            color="black"
            mt={4}
          >
            Lista de tareas
          </Heading>

          {isLoading ? (
            <HStack w="100%" justifyContent="center" mt={4}>
              <Spinner size="lg" color="amber.500" />
            </HStack>
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
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
