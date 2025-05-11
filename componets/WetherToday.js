import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView, ActivityIndicator, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const cities = ['Tel Aviv', 'Haifa', 'Jerusalem']; // רשימת ערים לדוגמה

const WeatherToday = () => {
    const navigation = useNavigation();
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [text, setText] = useState('Tel Aviv'); // ברירת מחדל: תל אביב
    const [query, setQuery] = useState('Tel Aviv'); // ברירת מחדל: תל אביב

    const API_KEY = '2a80e6f45343093bc40b5ce047445df0'; 

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`);
                setWeatherData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchWeatherData();
        }
    }, [query]);

    const handleSearch = (text) => {
        setQuery(text);
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>שגיאה: {error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="הקלד שם עיר... "
                value={text}
                onChangeText={setText} // עדכון ה-state של text
            />
            <Button
                title='שנה עיר'
                onPress={() => { handleSearch(text); }}
            />
           
            <Text style={styles.title}>מזג האוויר להיום</Text>
            <View style={styles.weatherContainer}>
                <Text style={styles.city}>עיר: {weatherData.name}</Text>
                <Image
                    source={{ uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }}
                    style={styles.icon}
                />
                <Text style={styles.temp}>טמפרטורה: {weatherData.main.temp.toFixed(1)} °C</Text>
                <Text style={styles.description}>מזג האוויר: {weatherData.weather[0].description}</Text>
                <Text style={styles.humidity}>לחות: {weatherData.main.humidity}%</Text>
                <Text style={styles.wind}>מהירות רוח: {weatherData.wind.speed} m/s</Text>
            </View>
            <Button 
                title={"ראה תחזית ל-5 ימים"}
                onPress={() => navigation.navigate('Forecast')}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        backgroundColor: '#e6f7ff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: '#333',
    },
    weatherContainer: {
        backgroundColor: '#f0f8ff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    city: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    icon: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },
    temp: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ff6347',
    },
    description: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#555',
    },
    humidity: {
        fontSize: 16,
        color: '#555',
    },
    wind: {
        fontSize: 16,
        color: '#555',
    },
    errorText: {
        color: 'red',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: '100%',
    },
});

export default WeatherToday;
