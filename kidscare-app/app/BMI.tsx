import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const { width, height } = Dimensions.get('window');

const BMICalculator: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [bmi, setBMI] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const calculateBMI = () => {
    const heightInMeter = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);

    if (isNaN(heightInMeter) || isNaN(weightInKg)) {
      Alert.alert('Invalid input', 'Please enter valid height and weight values.');
      return;
    }

    const bmiValue = (weightInKg / (heightInMeter * heightInMeter)).toFixed(1);
    setBMI(bmiValue);

    let bmiCategory = '';
    if (parseFloat(bmiValue) < 18.5) {
      bmiCategory = 'Underweight';
    } else if (parseFloat(bmiValue) >= 18.5 && parseFloat(bmiValue) < 24.9) {
      bmiCategory = 'Normal';
    } else if (parseFloat(bmiValue) >= 25 && parseFloat(bmiValue) < 29.9) {
      bmiCategory = 'Overweight';
    } else {
      bmiCategory = 'Obesity';
    }
    setCategory(bmiCategory);
  };

  const clearInputs = () => {
    setHeight('');
    setWeight('');
    setBMI(null);
    setCategory('');
  };

  const getIndicatorStyle = (category: string) => {
    switch (category) {
      case 'Underweight':
        return { backgroundColor: '#3498db', left: '15%' };
      case 'Normal':
        return { backgroundColor: '#2ecc71', left: '40%' };
      case 'Overweight':
        return { backgroundColor: '#f39c12', left: '65%' };
      case 'Obesity':
        return { backgroundColor: '#e74c3c', left: '85%' };
      default:
        return { backgroundColor: '#bdc3c7', left: '0%' };
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1A2980', '#26D0CE']}
        style={styles.background}
      >
        <View style={styles.content}>
          
          <Text style={styles.title}>BMI Calculator</Text>
          
          <View style={styles.meter}>
            <Text style={[styles.meterLabel, styles.underweight]}>Underweight</Text>
            <Text style={[styles.meterLabel, styles.normal]}>Normal</Text>
            <Text style={[styles.meterLabel, styles.overweight]}>Overweight</Text>
            <Text style={[styles.meterLabel, styles.obesity]}>Obesity</Text>
            {bmi && <View style={[styles.indicator, getIndicatorStyle(category)]} />}
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Height (cm)"
              placeholderTextColor="rgba(255,255,255,0.7)"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              placeholderTextColor="rgba(255,255,255,0.7)"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.calculateButton]} onPress={calculateBMI}>
              <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearInputs}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          
          {bmi && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>Your BMI: {bmi}</Text>
              <Text style={styles.categoryText}>Category: {category}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

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
    paddingHorizontal: width * 0.05,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
  },
  title: {
    fontSize: width * 0.08,
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    marginBottom: height * 0.03,
  },
  meter: {
    width: width * 0.9,
    height: height * 0.15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: height * 0.03,
  },
  meterLabel: {
    position: 'absolute',
    bottom: 10,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: width * 0.03,
  },
  underweight: { left: width * 0.05 },
  normal: { left: width * 0.3 },
  overweight: { right: width * 0.25 },
  obesity: { right: width * 0.05 },
  indicator: {
    position: 'absolute',
    bottom: height * 0.03,
    width: width * 0.04,
    height: height * 0.08,
    borderRadius: width * 0.01,
  },
  inputContainer: {
    width: '100%',
    marginBottom: height * 0.02,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: width * 0.04,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 25,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.1,
    elevation: 5,
    width: '48%',
  },
  calculateButton: {
    backgroundColor: '#2ecc71',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: height * 0.03,
    alignItems: 'center',
  },
  resultText: {
    color: 'white',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: width * 0.06,
    marginBottom: 5,
  },
  categoryText: {
    color: 'white',
    fontFamily: 'Poppins_400Regular',
    fontSize: width * 0.04,
  },
});

export default BMICalculator;