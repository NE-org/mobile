import { IComments, IPosts } from "@/types";
import { http } from "@/utils/config";
import { create } from "zustand";
import useSWR from 'swr';
import { fetcher } from "@/utils/utilities";

interface PostState {
    posts: IPosts[];
    message: string;
    addPost: (post: IPosts) => Promise<void>;
    removePost: (postId: number) => Promise<void>;
    updatePost: (post: IPosts) => Promise<void>;
    fetchComments: (postId: number) => Promise<IComments[]>;
}


export const usePosts = () => {
    const { data, error } = useSWR<IPosts[], Error>('/posts',
        fetcher<IPosts[]>, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );
    return {
        posts: data || [],
        isLoading: !error && !data,
        isError: !!error,
    };
};

export const usePostStore = create<PostState>((set) => ({
    posts: [],
    addPost: async (post: IPosts) => {
        try {
            const response = await http.post('/posts', post);
            const data = response.data;
            set((state) => ({ posts: [...state.posts, data.body], message: data.message }));
            return data;
        } catch (error) {
            console.error('Failed to add restaurant:', error);
            set({ message: 'Failed to add restaurant' });
        }
    },
    removePost: async (postId: number) => {
        try {
            console.log('The post id:', postId)
            const response = await http.delete(`/posts/${postId}`);
            const data = response.data;
            console.log('The data:', response.data);
            set((state) => ({ posts: state.posts.filter(r => r.id !== postId), message: data.message }));
            return data;
        } catch (error) {
            console.error('Failed to remove restaurant:', error);
            set({ message: 'Failed to remove restaurant' });
        }
    },
    updatePost: async (post: IPosts) => {
        try {
            const response = await http.put(`/posts/${post.id}`, post);
            const data = response.data;
            set((state) => ({
                posts: state.posts.map(r => r.id === post.id ? data.body : r),
                message: data.message
            }));
        } catch (error) {
            console.error('Failed to update restaurant:', error);
            set({ message: 'Failed to update restaurant' });
        }
    },
    fetchComments: async (postId: number) => {
        try {
            const response = await http.get(`/posts/${postId}/comments`);
            const data = response.data;
            set((state) => ({ posts: state.posts, message: 'Success!' }));
            return data;
        } catch (error) {
            console.error('Failed to fetch comments:', error);
            set({ message: 'Failed to fetch comments' });
        }
    },
    message: ''
}));