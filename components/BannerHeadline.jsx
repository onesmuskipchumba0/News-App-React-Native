import { Image, StyleSheet, Text, View, Linking } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

const BannerHeadline = ({headline}) => {
    const openLink = async (url) => {
        if (!url) return;
        Linking.openURL(url).catch(err => console.error("Failed to open URL: ", err));
      };
    
      // Safely render the headlines if available
      if (!headline || headline.length === 0) {
        return (
        <>
        <Text className='text-amber-300 text-lg'>Loading...</Text>
        <ActivityIndicator size={'large'}></ActivityIndicator>
        </>
            )
      }
  return (
    <View className='flex-col w-full bg-slate-900 items-center'>
        <Image source={{uri:headline.urlToImage}} width={'100%'} height={220} resizeMode='stretch'/>
        <Text className='text-white font-bold mt-4 text-lg' style={{fontFamily:'PoppinsBold'}}>{headline.title}</Text>
      
      <View className='w-full justify-center items-center'>
      <TouchableOpacity
      className='bg-amber-300 h-10 justify-center items-center w-[30%] m-5 rounded'>
        <Link className=' space-x-2' href={{
                pathname:'/articles/[Article].jsx',
                params:{
                    title:headline.title,
                    author:headline.author,
                    pub:headline.publishedAt,
                    image:headline.urlToImage,
                    content:headline.content,
                    description:headline.description,
                    url:headline.url,
                }
            }}>
            <Text className='text-black text-center '>Read More</Text>
        </Link>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BannerHeadline

const styles = StyleSheet.create({})