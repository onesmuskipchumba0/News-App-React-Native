import {
    ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { amber, black, blue } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
const Header = ({onMenuToggle}) => {
    const nav_items =[
        "Home", 
        "Featured",
        "Entertainment",
        "Business",
        "Science",
        "General",
        "Health",
        "Sports",
        "Technology"
        ]
    const [active, setActive] = useState("Home")
  return (
    <View
      className={`w-full h-28 justify-between items-center flex-col pl-4 pr-4 z-1`}
      style={{ backgroundColor: black, paddingTop: StatusBar.currentHeight }}
    >

        {/* Menu view */}
      <View className={`w-full flex-row justify-between items-center`}>
        {/* Menu Button */}
        <TouchableOpacity onPress={onMenuToggle}>
          <Ionicons name="menu" color={amber} size={24} />
        </TouchableOpacity>
        {/* The Heading text */}
        <Text
          className={`text-red-500 text-lg`}
          style={{ fontFamily: "PoppinsBold" }}
        >
          News Blaze
        </Text>
        {/* The search button */}
      </View>
      {/* NAv view */}
      <ScrollView horizontal={true} contentContainerStyle={{justifyContent:'center',alignItems:'center'}} className='w-full flex-row' style={{ backgroundColor: black}}>
      {nav_items.map((item, index)=>(
        <View key={index} className=''>
            <TouchableOpacity activeOpacity={0.5} onPress={() => setActive(item)}>
                <Link href={item ==="Home"?'/':`/navs/${item}`} className="ml-5">
                    <Text
                    className="text-md text-amber-200 "
                    style={[
                        styles.text,
                        item === active && styles.activeText, // Apply underline for the active item
                    ]}
                    >
                    {item}
                    </Text>
                </Link>
            </TouchableOpacity>
        </View>
    ))}
    </ScrollView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
    text: {
        fontFamily: 'PoppinsRegular',
      },
      activeText: {
        textDecorationLine: 'underline', // Add underline
        textDecorationColor: 'white', // Optional: customize the underline color
        fontWeight: 'semibold',
      },
});
