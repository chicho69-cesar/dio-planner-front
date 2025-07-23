import { useMutation } from '@tanstack/react-query'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Image as RNImage, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { shareMemory as shareMemoryApi } from '../api/memory'
import BottomNavigationBar from '../components/shared/bottom-navigation-bar'
import { useSelectedEventStore } from '../providers/event-state'
import { uploadImage } from '../utils/upload-image'

export default function ShareMemoryScreen({ navigation }) {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)

  const [image, setImage] = useState(null)
  const [imageFileName, setImageFileName] = useState(null)
  const [description, setDescription] = useState('')
  const [errorUpload, setErrorUpload] = useState(false)
  const [isUpload, setIsUpload] = useState(false)

  const shareMemoryMut = useMutation({
    mutationFn: async (values) => {
      const memory = await shareMemoryApi(
        values.title,
        values.picture,
        values.eventID
      )

      if (memory) {
        setErrorUpload(false)
      } else {
        setErrorUpload(true)
      }
    }
  })

  const onChangeDescription = (text) => {
    setDescription(text)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      setImageFileName(result.assets[0].fileName)
    }
  }

  const shareMemory = async () => {
    if (!image && description.length === 0) {
      return
    }

    const uri = image
    const type = 'image/jpeg'
    const name = imageFileName || 'image.jpg'

    const response = await uploadImage(uri, type, name)
    setIsUpload(true)

    if (response) {
      shareMemoryMut.mutate({
        title: description,
        picture: response,
        eventID: selectedEvent.id
      })
    } else {
      setErrorUpload(true)
    }
  }

  const goBack = () => {
    navigation.navigate('Event')
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Comparte un recuerdo</Text>

        <View style={styles.row}>
          <View style={styles.aspectRatio}>
            {image ? (
              <RNImage
                style={styles.image}
                source={{ uri: image }}
                alt="Imagen"
              />
            ) : (
              <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
                <Text style={styles.placeholderText}>Selecciona una imagen</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.aspectRatio}>
            <TextInput
              style={styles.textArea}
              multiline
              placeholder="El evento estuvo..."
              onChangeText={onChangeDescription}
              value={description}
            />
          </View>
        </View>

        {isUpload && (
          <Text style={errorUpload ? styles.errorText : styles.successText}>
            {errorUpload ? 'Error al subir la imagen' : 'Recuerdo compartido con éxito'}
          </Text>
        )}

        <TouchableOpacity
          style={[styles.button, isUpload && styles.buttonBack]}
          onPress={isUpload ? goBack : shareMemory}
        >
          <Text style={styles.buttonText}>
            {isUpload ? 'Volver' : 'Agregar recuerdo'}
          </Text>
        </TouchableOpacity>
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
  heading: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    width: '100%',
    textAlign: 'center'
  },
  row: {
    width: '100%',
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  aspectRatio: {
    width: '48%',
    aspectRatio: 3 / 4
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover'
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    padding: 8,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#1e293b',
    borderStyle: 'dotted',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: {
    fontSize: 16,
    color: '#22c55e',
    textAlign: 'center'
  },
  textArea: {
    width: '100%',
    height: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    color: '#1e293b',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    marginTop: 20,
    width: '100%',
    textAlign: 'center'
  },
  successText: {
    fontSize: 16,
    color: '#22c55e',
    marginTop: 20,
    width: '100%',
    textAlign: 'center'
  },
  button: {
    width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#1e293b',
    borderRadius: 24,
    alignItems: 'center'
  },
  buttonBack: {
    backgroundColor: '#b91c1c'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white'
  }
})
