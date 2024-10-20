import { Image, StyleSheet,ActivityIndicator, Text, View, Linking, TouchableOpacity } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native';
import BannerHeadline from './BannerHeadline';
import { Link } from 'expo-router';
const Headlines = ({ headlines }) => {
  // Function to open the URL
  const openLink = async (url) => {
    if (!url) return;
    Linking.openURL(url).catch(err => console.error("Failed to open URL: ", err));
  };
  if (!headlines || headlines.length === 0) {
    return (
        <>
    <Text className='text-amber-300 text-lg'>Loading...</Text>
    <ActivityIndicator size={'large'}></ActivityIndicator >
        </>
    );
  }

  return (
    <ScrollView className='mb-10 mt-3'>
        <BannerHeadline headline={headlines[0] || {}} />
      {headlines.map((item, index) => (
        <View className=' flex-row  shadow-md bg-amber-100 p-4' key={index} style={styles.headlineContainer}>
          {item.urlToImage ? (
            <Image 
            className='mr-4 ml-10 h-full'
            source={{uri:item.urlToImage}} width={80} height={80} resizeMode='cover'/>
          ) : (
            <Text style={styles.authorText}>Image: Unavailable</Text>
          )}
          <View>
          {item.author ? (
            <Text style={styles.authorText}>{item.author}</Text>
          ) : (
            <Text style={styles.authorText}>Author: Unknown</Text>
          )}
          <View className='flex-wrap'>
            <Text style={styles.titleText} >{item.title}</Text>
          </View>
          {item.url ? (
            <TouchableOpacity>
            <Link href={{
                pathname:'/articles/[Article].jsx',
                params:{
                    title:item.title,
                    author:item.author,
                    pub:item.publishedAt,
                    image:item.urlToImage,
                    content:item.content,
                    description:item.description,
                    url:item.url,
                }
            }}>
              <Text style={styles.linkText}>View More</Text>
            </Link>
            </TouchableOpacity>
          ) : (
            <Text>No URL Available</Text>
          )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Headlines;

const styles = StyleSheet.create({
style:{ marginBottom: 10, padding: 10 },
  headlineContainer: {
    justifyContent:'center',
    alignItems:"start",
    paddingLeft:10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom:1
  },
  authorText: {
    color: 'black',
  },
  titleText: {
    fontWeight: 'bold',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
