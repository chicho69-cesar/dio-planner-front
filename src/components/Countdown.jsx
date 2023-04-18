import React, { useEffect, useState } from 'react'
import { Text, VStack, Heading, HStack } from 'native-base'

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
    <HStack
      alignItems="center"
      justifyContent="center"
      w="100%"
      py={4}
      px={2}
      space={1}
    >
      <CountdownItem value={days} text="Dias" />
      <CountdownDivider />
      <CountdownItem value={hours} text="Horas" />
      <CountdownDivider />
      <CountdownItem value={minutes} text="Minutos" />
      <CountdownDivider />
      <CountdownItem value={seconds} text="Segund..." />
    </HStack>
  )
}

function CountdownItem({ value, text }) {
  return (
    <VStack
      justifyContent="center"
      alignItems="center"
      p={3}
      shadow={2}
      rounded="md"
      w="20"
      bg="coolGray.700"
    >
      <Heading color="white" size="xl" w="100%" textAlign="center">
        {value < 10 ? `0${value}` : value}
      </Heading>

      <Text fontSize="xs" color="white" w="100%" textAlign="center">
        {text}
      </Text>
    </VStack>
  )
}

function CountdownDivider() {
  return (
    <Text fontSize="lg" color="black" fontWeight="bold">
      :
    </Text>
  )
}
