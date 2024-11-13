import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import * as Animatable from 'react-native-animatable'

const { width, height } = Dimensions.get('window')

const ChangePassword: React.FC = () => {
  const [userName, setName] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [saving, setSaving] = useState(false)

  const saveUser = async () => {
    if (!userName || !password || !newPassword) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (password === newPassword) {
      Alert.alert('Error', 'New password must be different from the current password')
      return
    }

    const response = await axios.post('http://192.168.107.100:3000/auth/login', {
      userName: userName,
      password: password,
    });
    try {
      
      setSaving(true)
      const response = await axios.put('http://192.168.107.100:3000/auth/change-password', {   //reset-password
        userName: userName,
        password: password,
        newPassword: newPassword,
      })
      Alert.alert('Success', 'Password updated successfully.')
    } catch (error) {
      Alert.alert('Error', 'Failed to update password. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient colors={['#1A2980', '#26D0CE']} style={styles.background} />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Animatable.View animation="fadeIn" duration={1000} style={styles.logoContainer}>
         
        </Animatable.View>

        <Animatable.View animation="slideInUp" duration={1000} style={styles.formContainer}>
          <Text style={styles.title}>Reset Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#666"
              onChangeText={setName}
              value={userName}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="#666"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-open-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#666"
              onChangeText={setNewPassword}
              value={newPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={saveUser}
            disabled={saving}
            activeOpacity={0.7}
          >
            {saving ? (
              <ActivityIndicator color="##FF6B6B" />
            ) : (
              <Text style={styles.buttonText}>Update Password</Text>
            )}
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    maxWidth: 200,
    maxHeight: 200,
  },
  formContainer: {
    width: width * 0.9,
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4c669f',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default ChangePassword