import {
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  ScrollView,
  Spinner,
  Stack,
  Text
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useRecoilState } from 'recoil'

import * as PurchasesEndpoints from '../api/purchase'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Budget from '../components/Budget'
import Purchase from '../components/purchase/Purchase'
import { selectedEventState } from '../providers/event-state'

export default function PurchasesAndExpensesScreen() {
  const [selectedEvent] = useRecoilState(selectedEventState)

  const [isLoading, setIsLoading] = useState(true)
  const [budget, setBudget] = useState(0)
  const [purchases, setPurchases] = useState([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [edit, setEdit] = useState(false)
  const [editPurchase, setEditPurchase] = useState({})

  const getPurchasesFunc = async (eventID) => {
    const response = await PurchasesEndpoints.getPurchases(eventID)

    if (response) {
      setPurchases([
        ...response.map((purchase) => {
          return {
            id: purchase.id,
            title: purchase.title,
            price: purchase.price,
            eventID: purchase.eventID
          }
        })
      ])

      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (purchases.length === 0) {
      setBudget(0)
    } else {
      setBudget(
        purchases.reduce((acc, item) => {
          return acc + item.price
        }, 0)
      )
    }
  }, [purchases])

  useEffect(() => {
    getPurchasesFunc(selectedEvent.id)
  }, [selectedEvent])

  const onHandleChangeTitle = (text) => {
    setTitle(text)
  }

  const onHandleChangePrice = (text) => {
    setPrice(text.replace(/[^0-9]/g, ''))
  }

  const addPurchaseMut = useMutation(async (values) => {
    const purchase = await PurchasesEndpoints.addPurchase(
      values.title,
      values.price,
      values.eventID
    )

    if (purchase) {
      console.log(purchase)
      setPurchases([
        {
          id: purchase.id,
          title: purchase.title,
          price: purchase.price,
          eventID: purchase.eventID
        },
        ...purchases
      ])

      setIsLoading(false)
    } else {
      console.error('Error al agregar la compra')
    }
  })

  const updatePurchaseMut = useMutation(async (values) => {
    const purchaseUpdated = await PurchasesEndpoints.updatePurchase(
      values.id,
      values.title,
      values.price
    )

    if (purchaseUpdated) {
      console.log(purchaseUpdated)
      setPurchases(
        purchases.map((purchase) => {
          if (purchase.id === values.id) {
            return {
              id: purchaseUpdated.id,
              title: purchaseUpdated.title,
              price: purchaseUpdated.price,
              eventID: purchaseUpdated.eventID
            }
          }

          return purchase
        })
      )

      setIsLoading(false)
    } else {
      console.error('Error al actualizar la compra')
    }
  })

  const deletePurchaseMut = useMutation(async (values) => {
    const isDeleted = await PurchasesEndpoints.deletePurchase(values.id)

    if (isDeleted) {
      console.log(isDeleted)
      setPurchases(purchases.filter((purchase) => purchase.id !== values.id))
    }
  })

  const onHandleEdit = (id) => {
    let editedPurchase = purchases.find((purchase) => purchase.id === id)

    setEdit(true)
    setEditPurchase(editedPurchase)
    setTitle(editedPurchase.title)
    setPrice(`${editedPurchase.price}`)
  }

  const onHandleDelete = (id) => {
    deletePurchaseMut.mutate({ id: id })
  }

  const onAddPurchase = () => {
    addPurchaseMut.mutate({
      title: title,
      price: Number(price),
      eventID: selectedEvent.id
    })
  }

  const onUpdatePurchase = () => {
    updatePurchaseMut.mutate({
      id: editPurchase.id,
      title: title,
      price: Number(price)
    })
  }

  const onSubmit = () => {
    if (title === '' || price === '') {
      return
    }

    setIsLoading(true)
    edit ? onUpdatePurchase() : onAddPurchase()

    setEdit(false)
    setEditPurchase({})
    setTitle('')
    setPrice('')
  }

  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        <ScrollView w="100%" h="100%" showsVerticalScrollIndicator={false}>
          <Budget budget={budget} />

          <Heading w="100%" textAlign="left" fontSize="lg" color="black" mt={4}>
            Agrega más gastos
          </Heading>

          <FormControl w="100%" mt={2}>
            <Input
              value={title}
              w={{ base: '100%', md: '25%' }}
              color="coolGray.800"
              fontSize="lg"
              placeholder="Tequila..."
              onChangeText={onHandleChangeTitle}
              rounded="md"
              p="3"
              focusOutlineColor="coolGray.600"
            />
          </FormControl>

          <FormControl w="100%" my={2}>
            <HStack w="100%" justifyContent="space-between" alignItems="center">
              <Input
                value={price}
                w={{ base: '50%', md: '25%' }}
                color="coolGray.800"
                fontSize="lg"
                placeholder="$200.00..."
                onChangeText={onHandleChangePrice}
                rounded="md"
                p={3}
                focusOutlineColor="coolGray.600"
                keyboardType="numeric"
              />

              <Button
                bg="coolGray.800"
                colorScheme="coolGray"
                w="45%"
                rounded="md"
                p={3}
                shadow={1}
                borderWidth={1}
                borderColor="coolGray.600"
                onPress={onSubmit}
              >
                <Text fontSize="lg" color="coolGray.100">
                  {edit ? 'Actualizar' : 'Agregar'}
                </Text>
              </Button>
            </HStack>
          </FormControl>

          {purchases.length > 0 && (
            <Heading
              w="100%"
              textAlign="left"
              fontSize="lg"
              color="black"
              mt={4}
            >
              Gastos
            </Heading>
          )}

          {isLoading ? (
            <HStack w="100%" justifyContent="center" mt={4}>
              <Spinner size="lg" color="amber.500" />
            </HStack>
          ) : (
            purchases.map((purchase) => (
              <Purchase
                key={purchase.id}
                purchase={purchase}
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
