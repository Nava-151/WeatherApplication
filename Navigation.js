import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WeatherToday from './componets/WetherToday';
import WeatherForecast from './componets/WetherForecast';
const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <>
        
        <Stack.Navigator initialRouteName="Today">
            <Stack.Screen name="Today" component={WeatherToday} />
            <Stack.Screen name="Forecast" component={WeatherForecast} />
        </Stack.Navigator></>
    );
};

export default Navigation;
