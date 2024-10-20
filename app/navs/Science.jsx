import { View, Text, ActivityIndicator, Image, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Stack, Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import OffCanvas from '../../components/offCanvas';
const Science = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const openLink = async (url) => {
        if (!url) return;
        Linking.openURL(url).catch(err => console.error("Failed to open URL: ", err));
      };
    
    const endpoint = "https://newsapi.org/v2/top-headlines?category=science&apiKey=4a94ea88a9fd4b5a8589436afb76e038";
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await fetch(endpoint); // Await the fetch call
            if (!response.ok) { // Check if the response is OK
                throw new Error('Network response was not ok');
            }
            const data = await response.json(); // Await the JSON parsing
            setNews(data.articles); // Set articles to the state
        } catch (error) {
            console.error("Error fetching news:", error); // Log error if fetch fails
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    return (
        <View className='flex-1'>
          <Header onMenuToggle={() => setIsMenuOpen(true)} />
          <OffCanvas isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <Text className='font-semibold text-xl w-full text-center m-4'>Science News</Text>
            <ScrollView>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                news.map((item, index) => (
                    <View
                    className='bg-amber-100 flex-col' 
                    key={index} style={{ marginBottom: 1, padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
                        <Text style={{ fontWeight: 'bold' }}>{item.author || 'Unknown Author'}</Text>
                        <Text style={{ fontSize: 16 }}>{item.title}</Text>
                        <View className='flex-row items-center'>
                        <Image width={100} height={100} resizeMode='cover' source={item.urlToImage ? {uri:item.urlToImage}:require('../../assets/images/download.jpeg')}/>
                        <TouchableOpacity
                        onPress={() => openLink(item.url)}
                        className=' bg-slate-800 h-20 flex-row items-center justify-center w-[50%] rounded ml-2'>
                            <Ionicons name='book' size={24} color={'white'}/>
                            <Text className='text-lg text-slate-300 pl-4'>Read More</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                ))
            )}
            </ScrollView>
        </View>
    );
}

export default Science