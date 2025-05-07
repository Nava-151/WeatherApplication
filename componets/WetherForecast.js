import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Image, FlatList } from 'react-native';
import axios from 'axios';

const WeatherForecast = () => {
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const API_KEY = '2a80e6f45343093bc40b5ce047445df0'; // הכנס כאן את מפתח ה-API שלך
    const CITY_NAME = 'Tel Aviv'; // הכנס את שם העיר שברצונך לבדוק

    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&units=metric`);
                setForecastData(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchForecastData();
    }, []);

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

    // סינון רק ל-5 ימים
    const fiveDayForecast = forecastData.list.filter((item, index) => index % 8 === 0).slice(0, 5);

    const renderItem = ({ item }) => (
        <View style={styles.forecastItem}>
            <Text>תאריך: {new Date(item.dt * 1000).toLocaleDateString()}</Text>
            <Text>טמפרטורה: {item.main.temp.toFixed(1)} °C</Text>
            <Text>מזג האוויר: {item.weather[0].description}</Text>
            <Image
                source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
                style={styles.icon}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>תחזית ל-5 ימים הבאים</Text>
            <FlatList
                data={fiveDayForecast}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false} // כדי להסתיר את סמן הגלילה
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    forecastItem: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f0f8ff',
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    icon: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
});

export default WeatherForecast;
