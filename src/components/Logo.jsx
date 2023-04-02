import { Heading, Text } from 'native-base';

export default function Logo() {
  return <Heading 
    mb={6} color='amber.400' fontSize='4xl'
    fontFamily='mono'
  >
    dio<Text color='black'>Planner</Text>
  </Heading>;
}
