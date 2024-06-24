import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { router, usePathname } from 'expo-router'
import { usePosts, usePostStore } from '@/hooks/store/usePosts';
import { IComments, IPosts } from '@/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const PostIndex = () => {
    const { posts } = usePosts();
    const route = usePathname();
    const postId = route.split('/')[1];
    const post = posts.find((post: IPosts) => post.id === parseInt(postId));
    const [comments, setComments] = React.useState<IComments[]>([]);
    useEffect(() => {
        const fetchCommentInfo = async () => {
            const { fetchComments } = usePostStore.getState();
            const res = await fetchComments(parseInt(postId));
            console.log('The data:', res);
            setComments(res);
        };

        fetchCommentInfo();
    }, [postId]);

    const handleDeletePost = async () => {
        // if success show toast and navigate to /
        const { removePost } = usePostStore.getState();
        const res = await removePost(parseInt(postId));
        if (res != null) {
            Toast.show({
                type: 'success',
                text1: 'Post Deleted Successfully',
                position: 'bottom',
            });
            usePostStore.setState({ posts: posts.filter((post) => post.id !== parseInt(postId)) });
            router.push('/(tabs)/');
        } else {
            Toast.show({
                type: 'error',
                text1: 'Failed to delete post',
                position: 'bottom',
            });
        }
    }

    return (
        <SafeAreaView className='flex flex-1 h-screen bg-white justify-center items-center'>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className='bg-white border-b border-slate-100 rounded-xl p-4 shadow-md shadow-black/40'>
                    <Text className=' font-PoppinsMedium'>{post?.title}</Text>
                    <Text className='font-PoppinsLight'>{post?.body}</Text>

                    <Pressable onPress={handleDeletePost}>
                        <Text className='text-red-500 font-PoppinsMedium'>Delete Post</Text>
                    </Pressable>
                </View>
                <View className='bg-white border border-slate-100 rounded-xl p-4 my-2 shadow-md shadow-black/40'>
                    <Text className='font-PoppinsBold text-base'>Comments</Text>
                    {comments.map((comment) => (
                        <View key={comment.id} className='bg-white border border-slate-100 rounded-xl p-4 my-2 shadow-md shadow-black/40'>
                            <Text className=' font-PoppinsMedium'>{comment.name}</Text>
                            <Text className=' font-PoppinsMedium'>{comment.email}</Text>
                            <Text className='font-PoppinsLight'>{comment.body}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PostIndex;
