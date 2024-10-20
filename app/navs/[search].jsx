import { View, Text, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, Link } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'react-native'
import Header from '../../components/Header'
import OffCanvas from '../../components/offCanvas';
const Search = () => {
  const { input } = useLocalSearchParams() // Get the input parameter from the URL
  const endpoint = `https://newsapi.org/v2/everything?q=${input || "microsoft"}&apiKey=4a94ea88a9fd4b5a8589436afb76e038`
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch(endpoint)
      const json = await response.json()
      setNews(json.articles || [])
    } catch (err) {
      alert(`An error occurred: ${err.message}`)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
          <Header onMenuToggle={() => setIsMenuOpen(true)} />
          <OffCanvas isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    <ScrollView style={{}}>
      <Text className='w-full text-center text-xl font-semibold'>News on {input}</Text>
      {error && <Text>An error occurred: {error}</Text>}
      {loading ? (
        <ActivityIndicator />
      ) : (
        news.map((item, index) => (
          <View key={index} className="border-[0.3px] bg-amber-100 py-3 border-slate-400 pl-5 mb-1 pr-3">
            <View className="flex-row space-x-2">
              <Text>{item.author || "Unknown Author"}</Text>
              <Text className="font-bold">{item.publishedAt || "Unknown Publish Date"}</Text>
            </View>
            <Text className="font-bold">{item.title || "No Title"}</Text>
            <Image
              width="100%"
              height={100}
              resizeMode="cover"
              source={item.urlToImage ? { uri: item.urlToImage } : require('../../assets/images/download.jpeg')} />
            <Text>{item.description || "No Description"}</Text>
            <TouchableOpacity className="bg-slate-800 justify-center items-center h-8 my-2">
              <Link href={{
                pathname: "/navs/[Article].jsx", params: {
                  title: item.title,
                  author: item.author,
                  pub: item.publishedAt,
                  image: item.urlToImage,
                  content: item.content,
                  description: item.description,
                  url: item.url,
                }
              }}>
                <Text className="text-white">
                  <Ionicons name="book-outline" /> Read more
                </Text>
              </Link>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView></>
  )
}

export default Search
