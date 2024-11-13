import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  Dimensions, 
  StatusBar, 
  Alert 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });
  
  const navigation = useNavigation();

  if (!fontsLoaded) {
    return null;
  }

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.107.100:3000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password reset instructions have been sent to your email.');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#1A2980', '#26D0CE']} style={styles.background}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="rgba(255,255,255,0.7)" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="rgba(255,255,255,0.7)"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
  },
  title: {
    fontSize: width * 0.08,
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: height * 0.02,
  },
  subtitle: {
    fontSize: width * 0.04,
    color: 'rgba(255,255,255,0.8)',
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginBottom: height * 0.04,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    marginBottom: height * 0.03,
    width: '100%',
  },
  inputIcon: { padding: 10 },
  input: {
    flex: 1,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: width * 0.04,
    paddingVertical: 12,
    paddingRight: 10,
  },
  button: {
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    elevation: 5,
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: width * 0.045,
    textAlign: 'center',
  },
});
