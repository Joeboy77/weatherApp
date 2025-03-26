import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import CitySearch from '../components/CitySearch'
import WeatherInfo from '../components/WeatherInfo'

const API_KEY = '852255f8d2774ccb2f1c642b378804b5'


const HomeScreen = () => {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleCitySelect = async (city) => {
        setLoading(true)

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)

            if(!response.ok) {
                Alert.alert('City not found', `Could not find weather for ${city}`)
                setLoading(false)
                return
            }
            const data = await response.json()
            setWeather(data)
        } catch (error) {
            Alert.alert('Error', 'Could not load weather data. Please try again')
        } finally {
            setLoading(false)
        }
    }

  return (
    <View style={styles.container}> 
      
      <CitySearch onCitySelect={handleCitySelect}/>

      {
        loading && (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' color='blue'/>
                <Text style={styles.loadingText}>Loading weather data...</Text>
            </View>    
        )
      }

      {
        weather && !loading && (
            <WeatherInfo weatherData={weather}/>
        )
      }
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
      },
      title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        color: '#333',
      },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
      },
})