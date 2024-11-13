import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('window')

interface Vaccine {
  id: string
  name: string
  details: string
  dose: string
  route: string
  date: string
}

const VacDetails: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [vaccineData, setVaccineData] = useState<Vaccine[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    fetchUserData()
    fetchVaccineData()
  }, [])

  const fetchUserData = async () => {
    try {
      const storedUserName = await AsyncStorage.getItem('userName')
      if (storedUserName) {
        setUserName(storedUserName)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const fetchVaccineData = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('userToken')
      const response = await axios.get('http://192.168.107.100:3000/auth/vaccines', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setVaccineData(response.data)
    } catch (error) {
      console.error('Error fetching vaccine details:', error)
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    fetchVaccineData().then(() => setRefreshing(false))
  }

  const renderHeader = () => (
    <Animatable.View animation="fadeIn" duration={1000} style={styles.header}>
      <Image
        style={styles.profileImage}
        source={require('../assets/img/parent.jpg')}
      />
      <View style={styles.headerText}>
        <Text style={styles.greeting}>Hello, {userName}</Text>
        <Text style={styles.subGreeting}>Here are your vaccine details</Text>
      </View>
    </Animatable.View>
  )

  const renderVaccineItem = (vaccine: Vaccine) => (
    <Animatable.View animation="fadeInUp" duration={800} style={styles.vaccineItem}>
      <Text style={styles.vaccineName}>{vaccine.name}</Text>
      <Text style={styles.vaccineDetails}>{vaccine.details}</Text>
      <View style={styles.vaccineInfoRow}>
        <Text style={styles.vaccineInfo}>Dose: {vaccine.dose}</Text>
        <Text style={styles.vaccineInfo}>Route: {vaccine.route}</Text>
      </View>
      <Text style={styles.vaccineDate}>Date: {vaccine.date}</Text>
    </Animatable.View>
  )

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      {renderHeader()}
      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
          }
        >
          {vaccineData.map((vaccine) => renderVaccineItem(vaccine))}
        </ScrollView>
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subGreeting: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 5,
  },
  scrollContent: {
    padding: 15,
  },
  vaccineItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  vaccineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  vaccineDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  vaccineInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  vaccineInfo: {
    fontSize: 14,
    color: '#444',
  },
  vaccineDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
})

export default VacDetails