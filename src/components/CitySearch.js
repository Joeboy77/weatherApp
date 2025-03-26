import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'


const CitySearch = ({onCitySelect}) => {

    const [searctText, setSearchText] = useState('')
    const [cities, setCities] = useState([])
    const [loading, setLoading] = useState(false)

    const handleSearchText = (text) => {
        setSearchText(text)
    }

    const searchCities = async(text) => {

        if(text.length < 3){
            setCities([])
            return
        }
        setLoading(true)

        try {
            const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${text}&limit=10`, {
                headers: {
                    'X-RapidAPI-Key': '7025e15491msh34645b71e678b0ep16d5d8jsn670053a91cdd',
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                }
            })

            const data = await response.json()

            if(data && data.data && Array.isArray(data.data)){
                const cityList = data.data.map(city => city.name)
                setCities(cityList)
            } else {
                setCities([
                    'New York', 'London', 'Tokyo', 'Paris', 'Sydney',
                    'Berlin', 'Moscow', 'Dubai', 'Singapore', 'Barcelona'
                ].filter(city => 
                    city.toLowerCase().includes(text.toLowerCase())
                )
            )
            }

        } catch (error) {
            console.error('Error searching coties:', error)
            setCities([
                'New York', 'London', 'Tokyo', 'Paris', 'Sydney',
                'Berlin', 'Moscow', 'Dubai', 'Singapore', 'Barcelona'
            ].filter(city => 
                city.toLowerCase().includes(text.toLowerCase())
            )
            )
        } finally {
            setLoading(false)
        } 
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            searchCities(searctText)
        }, 500)

        return () => clearTimeout(timeOutId)
    }, [searctText])

    const handleCityPress = (city) => {
        onCitySelect(city)
        setSearchText('')
        setCities([])
    }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter City Name:</Text>

      <TextInput 
        style={styles.input}
        placeholder='Type a city name...'
        value={searctText}
        onChangeText={handleSearchText}
      />

      {
        loading && (
            <ActivityIndicator 
                style={styles.loadingIndicator}
                size='small'
                color='blue'
            />
        )
      }

      {
        cities.length > 0 && (
            <FlatList 
                data={cities}
                keyExtractor={(item, index) => `city-${index}`}
                style={styles.cityList}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => handleCityPress(item)} style={styles.cityItem}>
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
            />
        )
      }
    </View>
  )
}

export default CitySearch

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '700',
        color: '#333'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        backgroundColor: '#fff'
    },
    loadingIndicator: {
        marginTop: 10
    },
    cityList: {
        marginTop: 8,
        maxHeight: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff'
    },
    cityItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0'
    },
    cityName: {
        fontSize: 16
    }
})