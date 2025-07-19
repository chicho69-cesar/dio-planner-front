import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Countdown({ targetDate }) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      const restDays = Math.floor(distance / (1000 * 60 * 60 * 24))
      const restHours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const restMinutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      )
      const restSeconds = Math.floor((distance % (1000 * 60)) / 1000)

      setDays(restDays)
      setHours(restHours)
      setMinutes(restMinutes)
      setSeconds(restSeconds)
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <View style={styles.container}>
      <CountdownItem value={days} text="Dias" />
      <CountdownDivider />
      <CountdownItem value={hours} text="Horas" />
      <CountdownDivider />
      <CountdownItem value={minutes} text="Minutos" />
      <CountdownDivider />
      <CountdownItem value={seconds} text="Segund..." />
    </View>
  )
}

function CountdownItem({ value, text }) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemValue}>
        {value < 10 ? `0${value}` : value}
      </Text>
      <Text style={styles.itemText}>{text}</Text>
    </View>
  )
}

function CountdownDivider() {
  return (
    <Text style={styles.divider}>:</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 8,
    gap: 4,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
    width: 80,
    backgroundColor: '#374151',
  },
  itemValue: {
    color: 'white',
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 12,
    color: 'white',
    width: '100%',
    textAlign: 'center',
  },
  divider: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  }
})
