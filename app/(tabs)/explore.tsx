import Header from '@/components/Header';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native';
import { Link } from 'expo-router';
import { SetStateAction, useEffect, useState } from 'react';
import OffCanvas from '@/components/offCanvas';

export default function TabTwoScreen() {
  const top_headlines = "https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=4a94ea88a9fd4b5a8589436afb76e038"
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(()=>{
    fetchNews()
  },[])
  const fetchNews = async () =>{
    try{
      const response = await fetch(top_headlines)
      const json = await response.json()
      setNews(json.articles)
      setLoading(false)
    }catch(err){
      console.error(err)
    }finally{
      setLoading(false)
    }
    
  }
  const [input, setInput] = useState("")
  const onChangeHandler = (e: SetStateAction<string>)=>{
    setInput(e)
  }
  return (
    <View style={styles.container}>
          <Header onMenuToggle={() => setIsMenuOpen(true)} />
          <OffCanvas isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <View style={styles.searchbar}>
        <TextInput onChangeText={onChangeHandler} style={styles.input} placeholder='Search...'/>
          <Link href={{
            pathname:'../navs/[search].jsx',
            params:{input:input}

          }}>
            <Ionicons style={{marginRight:5}} name='search' size={24}/>
          </Link>
      </View>
      {loading && <ActivityIndicator/>}
      <ScrollView className='mb-10 mt-3'>
      {news.map((item, index) => (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',

  },
  input:{
    width:'90%',
    fontSize:12,
  },
searchbar:{
  width:'90%',
  height:40,
  backgroundColor:'cyan',
  justifyContent:'center',
  marginTop:5,
  paddingLeft:5,
  borderRadius:13,
  flexDirection:'row',
  alignItems:'center'
},
  headlineContainer: {
    justifyContent:'center',
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
