import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';

const ReadArticle = ({ article }) => {
  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{article.title || "No Title"}</Text>
        <Text style={{ fontSize: 16, color: 'gray' }}>{`By: ${article.author || "Unknown Author"}`}</Text>
        <Text style={{ fontSize: 14, color: 'gray' }}>{`Published on: ${article.publishedAt || "Unknown Date"}`}</Text>
        <Image
          style={{ width: '100%', height: 200, resizeMode: 'cover', marginVertical: 8 }}
          source={article.urlToImage ? { uri: article.urlToImage } : require('../assets/images/download.jpeg')}
        />
        <Text style={{ fontSize: 16 }}>{article.content || "No Content Available"}</Text>
        <Text style={{ marginTop: 16, fontStyle: 'italic' }}>{article.description || "No Description Available"}</Text>
      </View>
    </ScrollView>
  );
};

export default ReadArticle;
