import { Image, StyleSheet, Platform, View, Text, StatusBar } from 'react-native';
import { blue, amber, black, gray, purple } from '@/constants/Colors';
import Header from '../../components/Header'
import Headlines from '../../components/Headlines'
import BannerHeadline from '../../components/BannerHeadline'
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import OffCanvas from '../../components/offCanvas';

export default function HomeScreen() {
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
  return (
    <View style={styles.container}>
          <Header onMenuToggle={() => setIsMenuOpen(true)} />
          <OffCanvas isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Headlines headlines={news}/>
    </View>
  );
}

const styles = StyleSheet.create({
  text:{
    color:gray,
    
  },
  container:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:gray,
  }
});
