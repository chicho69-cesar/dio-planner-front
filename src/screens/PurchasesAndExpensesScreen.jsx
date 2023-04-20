import React, { useEffect, useState } from 'react'
import {
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  ScrollView,
  Stack,
  Text
} from 'native-base'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Budget from '../components/Budget'
import Purchase from '../components/purchase/Purchase'

export default function PurchasesAndExpensesScreen({ navigation, route }) {
  const [budget, setBudget] = useState(0)
  const [purchases, setPurchases] = useState([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [edit, setEdit] = useState(false)
  const [editPurchase, setEditPurchase] = useState({})

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

  const onHandleChangeTitle = (text) => {
    setTitle(text)
  }

  const onHandleChangePrice = (text) => {
    setPrice(text.replace(/[^0-9]/g, ''))
  }

  const onHandleEdit = (id) => {
    let editedPurchase = purchases.find((purchase) => purchase.id === id)

    setEdit(true)
    setEditPurchase(editedPurchase)
    setTitle(editedPurchase.title)
    setPrice(`${editedPurchase.price}`)
  }

  const onHandleDelete = (id) => {
    setPurchases(purchases.filter((purchase) => purchase.id !== id))
  }

  const onAddPurchase = () => {
    setPurchases([
      ...purchases,
      { id: purchases.length, title: title, price: +price }
    ])
  }

  const onUpdatePurchase = () => {
    setPurchases(
      purchases.map((purchase) => {
        if (purchase.id === editPurchase.id) {
          return {
            ...purchase,
            title: title,
            price: +price
          }
        }

        return purchase
      })
    )
  }

  const onSubmit = () => {
    if (title === '' || price === '') {
      return
    }

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
                bg="coolGray.600"
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

          {purchases.map((purchase) => (
            <Purchase
              key={purchase.id}
              purchase={purchase}
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
