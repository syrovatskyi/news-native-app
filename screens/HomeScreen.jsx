import React from 'react';
import { Text, View, Alert, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Post } from '../components/Post';
import axios from 'axios';

export const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [items, setItems] = React.useState([])

  const fetchPosts = () => {
    setIsLoading(true);
    axios.get('https://6525040c67cfb1e59ce66d5d.mockapi.io/articles/article')
    .then(({ data }) => {
      setItems(data);
    })
    .catch((err) => {
      console.log(err);
      Alert.alert('Error', 'Can\'t load articles');

    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  React.useEffect(fetchPosts, []);

  if(isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size='large' />
        <Text style={{ marginTop: 15 }}>Loading...</Text>
      </View>
    )
  }

  return (
    <View>
      <FlatList 
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts}/>}
        data={items}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('FullPost', { id: item.id, title: item.title })}>
              <Post 
                title={item.title}
                imageUrl={item.imageUrl}
                createdAt={item.createdAt}
              />
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
}
