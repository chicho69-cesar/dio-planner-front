import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import BottomNavigationBar from '../components/shared/bottom-navigation-bar';
import Countdown from '../components/shared/count-down';
import { useSelectedEventStore } from '../providers/event-state';

const cards = [
  {
    id: 1,
    title: 'Lista de invitados',
    icon: 'supervised-user-circle',
    color: '#f0f9ff',
    route: 'Guests'
  },
  {
    id: 2,
    title: 'Lista de tareas',
    icon: 'add-task',
    color: '#f0fdf4',
    route: 'TodoList'
  },
  {
    id: 3,
    title: 'Compras',
    icon: 'add-shopping-cart',
    color: '#f8fafc',
    route: 'Purchases'
  },
  {
    id: 4,
    title: 'Recuerdos',
    icon: 'insert-photo',
    color: '#f5f3ff',
    route: 'Memories'
  },
  {
    id: 5,
    title: 'Calificar evento',
    icon: 'star-border',
    color: '#fffbeb',
    route: 'EventGrade'
  }
];

export default function EventScreen({ navigation }) {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Tiempo restante para el evento</Text>
          <Countdown targetDate={selectedEvent.date} />

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Temática del evento: </Text>
              {selectedEvent.topic}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Ubicación del evento: </Text>
              {selectedEvent.location}
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Descripción del evento: </Text>
              {selectedEvent.description}
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Acciones de interés</Text>

          <View style={styles.cardsContainer}>
            {cards.map((card) => {
              if (selectedEvent.accessibility && card.id === 5) {
                return null;
              }

              return (
                <Pressable
                  key={card.id}
                  style={[styles.card, { backgroundColor: card.color }]}
                  onPress={() => navigation.navigate(card.route)}
                >
                  <View style={styles.cardContent}>
                    <View style={styles.cardLeft}>
                      <MaterialIcons name={card.icon} size={32} color="#1e293b" />
                      <Text style={styles.cardTitle}>{card.title}</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={32} color="#1e293b" />
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View style={{ height: 64 }} />
        </ScrollView>
      </View>

      <BottomNavigationBar active="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginVertical: 16,
  },
  infoContainer: {
    width: '90%',
    marginHorizontal: '5%',
    marginVertical: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
  },
  infoText: {
    fontSize: 16,
    color: 'black',
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  card: {
    width: '90%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    padding: 16,
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 8,
  },
});
