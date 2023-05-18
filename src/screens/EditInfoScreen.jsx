import { Stack } from 'native-base'
import React from 'react'

import BottomNavigationBar from '../components/BottomNavigationBar'

export default function EditInfoScreen({ navigation, route }) {
  return (
    <Stack w="100%" h="100%" alignItems="center" justifyContent="center">
      <Stack w="100%" h="100%" px={4} pt={16} pb={0}>
        {/* TODO: Add in this part a picker image and text area for description */}

        {/* TODO: Add in this part a input for name */}

        {/* TODO: Add in this part a input for new password */}

        {/* TODO: Add in this part a input for confirm new password */}

        {/* TODO: Add in this part a button to save changes */}
      </Stack>

      <BottomNavigationBar active="None" />
    </Stack>
  )
}
