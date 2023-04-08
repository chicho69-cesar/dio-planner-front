import { HStack, Text, Pressable, Icon } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";

export function HomeHeader({ navigation, route }) {
  return <HStack w='100%' justifyContent='space-between' alignItems='center'>
    <Text fontSize='lg' fontWeight='bold' color='black'>
      Proximos eventos
    </Text>

    <Pressable onPress={() => navigation.navigate('Login')}>
      <Icon 
        as={<MaterialIcons name='search'/>}
        size={6} mr='2' color='gray.600' fontWeight='bold'
      />
    </Pressable>
  </HStack>;
}
