// src/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const [recentImages, setRecentImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const cachedImages = await AsyncStorage.getItem('cachedImages');

        if (cachedImages) {
          setRecentImages(JSON.parse(cachedImages));
        }

        //here i am  Fetching recent images from Flickr API
        const response = await fetch(
          'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'
        );

        const data = await response.json();

        // Updating the  state with new images
        setRecentImages(data.photos.photo);

        // here i am Caching  the images for offline use
        AsyncStorage.setItem('cachedImages', JSON.stringify(data.photos.photo));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <FlatList
        data={recentImages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity >
            <Image source={{ uri: item.url_s }} style={styles.image} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    image:{
        width: 300,
        height: 200,
        marginBottom: 10,
        marginLeft: 45,
        borderRadius: 10,
    }
})

