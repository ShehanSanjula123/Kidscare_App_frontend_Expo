import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('window');

interface LoginButtonProps {
  onPress: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onPress }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <LinearGradient
      colors={['#0796FA', '#0653B6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.loginButton}
    >
      <Text style={styles.loginButtonText}>Login</Text>
    </LinearGradient>
  </TouchableOpacity>
);

interface FrontPageProps {
  navigation: any;
}

const FrontPage: React.FC<FrontPageProps> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1A2980', '#26D0CE']}
        style={styles.background}
      >
        <View style={styles.content}>
          <Image
            source={require('../assets/img/Logonew.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome to KidsCare</Text>
          <LoginButton onPress={handleLogin} />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.1,
  },
  logo: {
    width: width * 1.9,
    height: height * 0.9,
    marginBottom: height * -0.3,
    marginLeft: width * 0.56,
  },
  title: {
    fontSize: width * 0.08,
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
    marginBottom: height * 0.05,
  },
  loginButton: {
    borderRadius: 30,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    elevation: 5,
  },
  loginButtonText: {
    fontSize: width * 0.05,
    fontFamily: 'Poppins_400Regular',
    color: 'white',
    textAlign: 'center',
  },
});

export default FrontPage;