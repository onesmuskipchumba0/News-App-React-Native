import { View, Text, ScrollView, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useEffect } from 'react'
import ReadArticle from '../../components/ReadArticle'
import { useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
const Article = () => {
  const {title} = useLocalSearchParams()
  const {author} = useLocalSearchParams()
  const {image} = useLocalSearchParams()
  const {pub} = useLocalSearchParams()
  const {content} = useLocalSearchParams()
  const {description} = useLocalSearchParams()
  const {url} = useLocalSearchParams()
  const openLink = async (url) => {
    if (!url) return;
    Linking.openURL(url).catch(err => console.error("Failed to open URL: ", err));
  };
  return (
    <ScrollView className='m-5 bg-gray-200 px-3 space-y-2' style={{fontFamily:'PoppinsRegular'}}>
        <Text className=''>By {author}</Text>
        <Image source={{uri: image}} width={'100%'} height={400} className='rounded-lg'/>
        <Text className='font-semibold'>Published at: {pub}</Text>
        <Text className='font-bold'>{title}</Text>
        <Text className='font-semibold'>{description}</Text>
        <Text className='font-semibold'>{url}</Text>
        <Text>{content}</Text>
        <TouchableOpacity onPress={()=> openLink(url)} className='justify-center space-x-2 flex-row items-center h-10 bg-slate-800'>
          <Ionicons name='book-outline' color={'white'} size={24}/>
          <Text className='text-slate-400'>Open on Browser</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}

export default Article