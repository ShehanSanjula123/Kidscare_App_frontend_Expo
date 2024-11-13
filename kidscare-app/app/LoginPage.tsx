import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  parentHome: { nicNo: string; userName: string; userType: string };
  docHome: { nicNo: string; userName: string; userType: string };
  ForgotPassword: undefined;
  ResetPassword: { email: string };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const buttonScale = new Animated.Value(1);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handlePressIn = () => {
    Animated.spring(buttonScale, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.107.100:3000/auth/login', {
        userName: username,
        password: password,
      });

      const { accessToken, nicNo, userName, userType } = response.data;

      if (accessToken && userType) {
        await AsyncStorage.setItem('accessToken', accessToken);

        if (userType === 'PARENT') {
          navigation.navigate('parentHome', { nicNo, userName, userType });
        } else if (userType === 'DOCTOR') {
          navigation.navigate('docHome', { nicNo, userName, userType });
        } else {
          Alert.alert('Error', 'Unknown user type');
        }
      } else {
        Alert.alert('Login Failed', 'Invalid credentials or user type');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', 'An error occurred during login. Please try again.');
    }
  };

  const handleChangePassword = () => {
    navigation.navigate('ChangeP');
  };
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <StatusBar style="light" />
        <LinearGradient colors={['#0796FA', '#0653B6']} style={styles.gradient}>
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Welcome Back</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={24} color="#A0A0A0" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="#A0A0A0"
                value={username}
                onChangeText={setUsername}
              />
            </View>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={24} color="#A0A0A0" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#A0A0A0"
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Ionicons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={24} color="#A0A0A0" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={handleLogin} activeOpacity={0.8}>
              <Animated.View style={[styles.button, { transform: [{ scale: buttonScale }] }]}>
                <Text style={styles.buttonText}>Login</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChangePassword} style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>ChangePassword?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordText}>ForgotPassword?</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loginContainer: {
    width: width * 0.9,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  title: { fontSize: width * 0.08, color: 'white', marginBottom: height * 0.04, fontWeight: 'bold' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    marginBottom: height * 0.02,
    paddingHorizontal: 10,
  },
  icon: { marginRight: 10 },
  input: { flex: 1, color: 'white', fontSize: width * 0.04, paddingVertical: 15 },
  button: { backgroundColor: '#FF6B6B', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25, marginTop: height * 0.02 },
  buttonText: { color: 'white', fontSize: width * 0.05, fontWeight: 'bold', textAlign: 'center' },
  forgotPasswordButton: { marginTop: height * 0.03},
  forgotPasswordText: { color: '#FF6B6B', fontSize: width * 0.036, textDecorationLine: 'underline' },
});
