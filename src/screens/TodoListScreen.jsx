import DateTimePicker from '@react-native-community/datetimepicker'
import {
  Button,
  FormControl,
  HStack,
  Heading,
  ScrollView,
  Stack,
  TextArea
} from 'native-base'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

import BottomNavigationBar from '../components/BottomNavigationBar'
import ButtonAction from '../components/ButtonAction'
import Todo from '../components/todo-list/Todo'
import { selectedEventState } from '../providers/event-state'
import { getPickedDate } from '../utilities/getTextDateES'

export default function TodoListScreen({ navigation, route }) {
  const [selectedEvent] = useRecoilState(selectedEventState)

  const [todos, setTodos] = useState([])
  const [todoText, setTodoText] = useState('')
  const [pickedDate, setPickedDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editTodo, setEditTodo] = useState({})

  const onChangeTodo = (text) => {
    setTodoText(text)
  }

  const onChangeDate = (event, date) => {
    if (date) {
      setShowCalendar(false)
      setPickedDate(date)
    }
  }

  const onHandleComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete }
        } else {
          return todo
        }
      })
    )
  }

  const onHandleEdit = (id) => {
    let editedTodo = todos.find((todo) => todo.id === id)

    setEdit(true)
    setEditTodo(editedTodo)
    setTodoText(editedTodo.text)
    setPickedDate(editedTodo.date)
  }

  const onHandleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const addTodo = () => {
    setTodos([
      ...todos,
      { id: todos.length, text: todoText, date: pickedDate, complete: false }
    ])
  }

  const updateTodo = () => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === editTodo.id) {
          return {
            id: todo.id,
            text: todoText,
            date: pickedDate,
            complete: false
          }
        }

        return todo
      })
    )
  }

  const onHandleSubmit = () => {
    if (todoText === '') {
      return
    }

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

          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onComplete={onHandleComplete}
              onEdit={onHandleEdit}
              onDelete={onHandleDelete}
            />
          ))}
        </ScrollView>
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
