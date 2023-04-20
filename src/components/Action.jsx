import React from 'react'
import { Pressable, Icon } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'

export default function Action({ onPress, icon, bg, color }) {
  return (
    <Pressable bg={bg} p={1} rounded="sm" onPress={onPress}>
      <Icon
        as={<MaterialIcons name={icon} />}
        size={5}
        color={color}
        fontWeight="bold"
      />
    </Pressable>
  )
}
