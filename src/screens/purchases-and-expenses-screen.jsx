import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import * as PurchasesEndpoints from '../api/purchase'
import Purchase from '../components/purchase/purchase'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import Budget from '../components/shared/budget'
import { useSelectedEventStore } from '../providers/event-state'

export default function PurchasesAndExpensesScreen() {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)

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
      setPurchases(response.map(purchase => ({
        id: purchase.id,
        title: purchase.title,
        price: purchase.price,
        eventID: purchase.eventID
      })))

      setIsLoading(false)
    }
  }

  useEffect(() => {
    setBudget(purchases.reduce((acc, item) => acc + item.price, 0))
  }, [purchases])

  useEffect(() => {
    getPurchasesFunc(selectedEvent.id)
  }, [selectedEvent])

  const onHandleChangeTitle = (text) => setTitle(text)
  const onHandleChangePrice = (text) => setPrice(text.replace(/[^0-9]/g, ''))

  const addPurchaseMut = useMutation({
    mutationFn: async (values) => {
      const purchase = await PurchasesEndpoints.addPurchase(
        values.title,
        values.price,
        values.eventID
      )
      if (purchase) {
        setPurchases([{
          id: purchase.id,
          title: purchase.title,
          price: purchase.price,
          eventID: purchase.eventID
        }, ...purchases])

        setIsLoading(false)
      }
    }
  })

  const updatePurchaseMut = useMutation({
    mutationFn: async (values) => {
      const purchaseUpdated = await PurchasesEndpoints.updatePurchase(
        values.id,
        values.title,
        values.price
      )
      if (purchaseUpdated) {
        setPurchases(purchases.map(purchase =>
          purchase.id === values.id ? {
            id: purchaseUpdated.id,
            title: purchaseUpdated.title,
            price: purchaseUpdated.price,
            eventID: purchaseUpdated.eventID
          } : purchase
        ))

        setIsLoading(false)
      }
    }
  })

  const deletePurchaseMut = useMutation({
    mutationFn: async (values) => {
      const isDeleted = await PurchasesEndpoints.deletePurchase(values.id)
      if (isDeleted) {
        setPurchases(purchases.filter(purchase => purchase.id !== values.id))
      }
    }
  })

  const onHandleEdit = (id) => {
    const editedPurchase = purchases.find(purchase => purchase.id === id)
    setEdit(true)
    setEditPurchase(editedPurchase)
    setTitle(editedPurchase.title)
    setPrice(`${editedPurchase.price}`)
  }

  const onHandleDelete = (id) => deletePurchaseMut.mutate({ id })

  const onSubmit = () => {
    if (!title || !price) return

    setIsLoading(true)
    if (edit) {
      updatePurchaseMut.mutate({
        id: editPurchase.id,
        title,
        price: Number(price)
      })
    } else {
      addPurchaseMut.mutate({
        title,
        price: Number(price),
        eventID: selectedEvent.id
      })
    }

    setEdit(false)
    setEditPurchase({})
    setTitle('')
    setPrice('')
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Budget budget={budget} />

        <Text style={styles.sectionTitle}>Agrega más gastos</Text>

        <TextInput
          style={styles.input}
          value={title}
          placeholder="Tequila..."
          onChangeText={onHandleChangeTitle}
        />

        <View style={styles.priceContainer}>
          <TextInput
            style={[styles.input, styles.priceInput]}
            value={price}
            placeholder="$200.00..."
            onChangeText={onHandleChangePrice}
            keyboardType="numeric"
          />
          <Pressable style={styles.submitButton} onPress={onSubmit}>
            <Text style={styles.submitButtonText}>
              {edit ? 'Actualizar' : 'Agregar'}
            </Text>
          </Pressable>
        </View>

        {purchases.length > 0 && (
          <Text style={styles.sectionTitle}>Gastos</Text>
        )}

        {isLoading ? (
          <ActivityIndicator size="large" color="#f59e0b" style={styles.loader} />
        ) : (
          purchases.map(purchase => (
            <Purchase
              key={purchase.id}
              purchase={purchase}
              onEdit={onHandleEdit}
              onDelete={onHandleDelete}
            />
          ))
        )}
      </ScrollView>
      <BottomNavigationBar active="Home" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceInput: {
    width: '48%',
  },
  submitButton: {
    width: '48%',
    height: 50,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  loader: {
    marginVertical: 32,
  },
})
