'use client'

import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return date.toLocaleDateString(undefined, options)
}

const ParentHome: React.FC<{ navigation: any }> = ({ navigation }) => {
  const scale = useSharedValue(0.8)

  useEffect(() => {
    scale.value = withSpring(1)
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <LinearGradient
        colors={['#ffffff', '#f0f8ff']}
        style={styles.background}
      />
      <ParentTop />
      <Animated.View style={[styles.buttonContainer, animatedStyle]}>
        {[
          { name: 'Profiles', icon: 'person', route: 'KidProf' },
          { name: 'Announcements', icon: 'megaphone', route: 'Announcements' },
          { name: 'Vaccine Details', icon: 'medical', route: 'vacDetails' },
          { name: 'BMI Calculator', icon: 'calculator', route: 'BMI' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(item.route)}
          >
            <LinearGradient
              colors={['#4CAF50', '#2196F3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Ionicons name={item.icon as any} size={32} color="#FFF" />
              <Text style={styles.buttonText}>{item.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </ScrollView>
  )
}

const ParentTop: React.FC = () => {
  const currentDate = formatDate(new Date())

  return (
    <View style={styles.topContainer}>
      <Image
        style={styles.profileImage}
        source={require('../assets/img/parent.jpg')}
      />
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hello, parentName</Text>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  textContainer: {
    marginLeft: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  date: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    marginTop: 20,
  },
  button: {
    width: width * 0.4,
    aspectRatio: 1,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
})

export default ParentHome