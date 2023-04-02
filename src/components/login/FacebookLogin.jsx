import { Image } from 'react-native';
import { Button, HStack, Text } from 'native-base';

export default function FacebookLogin() {
  const facebookLogin = () => {
    console.log('Login con facebook');
  }

  return <Button 
    w='45%' bg='facebook.100' variant='subtle' shadow={1} 
    borderWidth={0} rounded='lg' colorScheme='darkBlue'
    _text={{ fontSize: 'md', fontWeight: 'semibold', color: 'white' }}
    onPress={facebookLogin}
  >
    <HStack
      w='100%' space={1} justifyContent='center' alignItems='center'
    >
      <Image
        source={require('../../../assets/svg/facebook.png')}
        style={{ height: 25, width: 25 }}
      />

      <Text fontSize='md' fontWeight='semibold' color='white'>
        Facebook
      </Text>
    </HStack>
  </Button>;
}
