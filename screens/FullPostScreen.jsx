import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { Loading } from '../components/Loading';

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;



export const FullPostScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState();

    const { id, title } = route.params;

    const fetchPosts = () => {
      navigation.setOptions({
        title
      })
      setIsLoading(true);
        axios.get(`https://6525040c67cfb1e59ce66d5d.mockapi.io/articles/article/${id}`)
        .then(({ data }) => {
          setData(data);
        })
        .catch((err) => {
          console.log(err);
          Alert.alert('Error', 'Can\'t load article');
    
        })
        .finally(() => {
          setIsLoading(false);
        })
      }
    
      React.useEffect(fetchPosts, []);

      if(isLoading) {
        return (
          <Loading />
        )
      }

    return (
        <ScrollView style={{padding: 20}} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />} >
            <PostImage source={{uri: data.imageUrl}} />
            <PostText>
              {data.text}
            </PostText>
        </ScrollView>
    )
}