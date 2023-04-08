import { HStack, Text } from 'native-base';

export default function BottomNavigationBar({ navigation, route, active }) {
  return <HStack 
    w='100%' h='32' bg='violet.200' shadow={2}
  >
    <Text fontSize='lg' color='black'>
      {active}
    </Text>
  </HStack>;
}
