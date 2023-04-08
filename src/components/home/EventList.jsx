import { FlatList } from 'native-base';
import Event from './Event';

export default function EventList({ navigation, route, events }) {
  return <FlatList h='100%'
    data={events}
    ItemSeparatorComponent={<></>}
    keyExtractor={(item) => item.id.toString()}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (
      <Event 
        navigation={navigation}
        route={route}
        item={item}
      />
    )}
  />;
}
