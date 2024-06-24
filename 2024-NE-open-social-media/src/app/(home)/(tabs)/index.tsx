import { Pressable, SafeAreaView, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { usePosts, usePostStore } from '@/hooks/store/usePosts';
import { Text } from '@/components/shared/Themed';
import { router } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSearch } from '@/context/searchContext';
import { ActivityIndicator } from 'react-native-paper';
import AnimationSection from '@/components/shared/AnimationSection';

const Home = () => {
  const { posts, isLoading: postsLoading } = usePosts();
  const { fetchComments } = usePostStore.getState();
  const { searchText } = useSearch();
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [commentsCount, setCommentsCount] = useState<{ [key: number]: number }>({});
  const [isLoading, setIsLoading] = useState(true); // Loader state

  useEffect(() => {
    setIsLoading(postsLoading);
  }, [postsLoading]);

  useEffect(() => {
    if (searchText) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchText, posts]);

  useEffect(() => {
    if (searchText) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchText, posts]);

  useEffect(() => {
    const loadCommentsCount = async () => {
      setIsLoading(true);
      const commentsCountMap: { [key: number]: number } = {};
      for (const post of posts) {
        try {
          const comments = await fetchComments(post.id);
          commentsCountMap[post.id] = comments.length;
        } catch (error) {
          console.error('Failed to fetch comments for post ID:', post.id, error);
          commentsCountMap[post.id] = 0;
        }
      }
      setCommentsCount(commentsCountMap);
      setIsLoading(false);
    };

    if (posts.length > 0) {
      loadCommentsCount();
    }
  }, [posts, fetchComments]);

  return (
    <SafeAreaView className='bg-white px-4'>
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredPosts.map((post) => (
          <Pressable key={post.id} onPress={() => router.push(`/(post)/${post.id}`)}>
            <Animated.View entering={FadeIn.duration(2000)} className='bg-white border border-slate-100 rounded-xl p-4 my-2 shadow-md shadow-black/40'>
              <Text>{post.title}</Text>
              <Text className='font-PoppinsLight'>{post.body}</Text>
              <Text className='font-PoppinsLight'>{commentsCount[post.id] ?? 0} Comments(s)</Text>
            </Animated.View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
