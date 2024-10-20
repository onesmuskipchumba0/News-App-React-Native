import { View, Text, ScrollView } from 'react-native'
import React,{useState} from 'react'
import Header from '../../components/Header'
import Category from '../../components/Category'
import OffCanvas from '../../components/offCanvas';
const categories = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <View>
      <Header onMenuToggle={() => setIsMenuOpen(true)} />
      <OffCanvas isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <ScrollView style={{marginBottom:8}}>
        <Category title='Business' category={'business'}/>
        <Category title='Entertainment' category={'entertainment'}/>
        <Category title='General' category={'General'}/>
        <Category title='Health' category={'Health'}/>
        <Category title='Science' category={'science'}/>
        <Category title='Sports' category={'sports'}/>
        <Category title='Technology' category={'technology'}/>
      </ScrollView>
    </View>
  )
}

export default categories