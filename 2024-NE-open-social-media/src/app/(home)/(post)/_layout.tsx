import CustomHeader from '@/components/section-heading/CustomHeader'
import { usePosts } from '@/hooks/store/usePosts';
import { IPosts } from '@/types';
import { Slot, usePathname, useRouter } from 'expo-router';
import React from 'react'

const PostIndexLayout = () => {
    const { posts } = usePosts();
    const route = usePathname();
    const postId = route.split('/')[1];
    const router = useRouter();
    const post = posts.find((post: IPosts) => post.id === parseInt(postId));
    console.log(postId);
    return (
        <>
            <CustomHeader title={`${post?.title.slice(0,5)}...` || ''} navigateBack={router.back} />
            <Slot />
        </>
    )
}

export default PostIndexLayout