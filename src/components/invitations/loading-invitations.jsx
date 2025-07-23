import { StyleSheet, View } from 'react-native'
import CustomDivider from '../shared/custom-divider'

export default function LoadingInvitations() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonInfo}>
          <View style={styles.skeletonTitle} />
          <View style={styles.skeletonDate} />
          <View style={styles.skeletonDescription} />
          <View style={styles.skeletonDescription} />
        </View>
      </View>
      <CustomDivider />
      <View style={styles.actions}>
        <View style={styles.skeletonAccept} />
        <View style={styles.skeletonDecline} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#475569',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1e293b',
  },
  skeletonInfo: {
    width: '65%',
    padding: 8,
  },
  skeletonTitle: {
    height: 20,
    borderRadius: 4,
    backgroundColor: '#4b5563',
    marginBottom: 8,
  },
  skeletonDate: {
    height: 16,
    borderRadius: 8,
    backgroundColor: '#f59e0b',
    marginBottom: 32,
    width: '50%',
  },
  skeletonDescription: {
    height: 16,
    borderRadius: 4,
    backgroundColor: '#4b5563',
    marginBottom: 8,
  },
  actions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  skeletonAccept: {
    width: '45%',
    height: 32,
    borderRadius: 6,
    backgroundColor: '#f59e0b',
  },
  skeletonDecline: {
    width: '45%',
    height: 32,
    borderRadius: 6,
    backgroundColor: '#1e293b',
  }
})
