import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';

const Category = ({ category, title }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const endpoint = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=4a94ea88a9fd4b5a8589436afb76e038`;

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log('API Response:', data); // Inspect the response structure

      if (data.articles) {
        setNews(data.articles);
      } else {
        setError('No articles found for this category.');
      }
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-lg font-bold py-3">{title}</Text>
      <ScrollView horizontal={true} className="space-x-3 ml-5">
        {news.map((item, index) => (
          <View className="bg-amber-100 w-64 justify-center items-start px-4" key={index}>
            {item.urlToImage ? (
              <Image
                className="w-full"
                source={{ uri: item.urlToImage }}
                width={50}
                height={70}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.authorText}>Image: Unavailable</Text>
            )}

            <View className="space-y-3">
              <Text>{item.author || 'Unknown Author'}</Text>
              <Text className="font-semibold">{new Date(item.publishedAt).toLocaleDateString()}</Text>
            </View>

            <Text className="font-semibold py-3">{item.title}</Text>
            <Text>{item.description}</Text>

            {item.url ? (
              <TouchableOpacity className="w-24 bg-slate-900 h-8 items-center justify-center rounded-md mt-2">
                <Link
                  href={{
                    pathname: '/articles/[Article].jsx',
                    params: {
                      title: item.title,
                      author: item.author,
                      pub: item.publishedAt,
                      image: item.urlToImage,
                      content: item.content,
                      description: item.description,
                      url: item.url,
                    },
                  }}
                >
                  <Text className="text-amber-200">View More</Text>
                </Link>
              </TouchableOpacity>
            ) : (
              <Text>No URL Available</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  authorText: {
    fontStyle: 'italic',
    color: 'gray',
  },
});
