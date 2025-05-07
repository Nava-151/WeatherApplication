import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import WeatherToday from './componets/WetherToday';
import { SafeAreaView,SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';

export default function App() {
  ToastAndroid.show("welcome to our application, please type your city...",ToastAndroid.LONG)

  return (
<>
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
    </>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
