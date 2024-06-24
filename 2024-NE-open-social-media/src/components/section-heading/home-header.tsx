import React, { useState } from 'react';
import { Image, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/shared/Themed';
import { FontAwesome } from "@expo/vector-icons";
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { router } from 'expo-router';
import { useSearch } from '@/context/searchContext';

interface HomeTabHeaderProps {
    onSearch: (text: string) => void;
    showSearch?: boolean;
}

const HomeTabHeader: React.FC<HomeTabHeaderProps> = ({ onSearch, showSearch }) => {
    const [searchActive, setSearchActive] = useState(false);
    const [searchText, setSearchTextValue] = useState('');
    const { setSearchText } = useSearch();

    const handleSearchPress = () => {
        setSearchActive(true);
    };

    const handleSearchChange = (text: string) => {
        setSearchTextValue(text);
        onSearch(text);
    };

    const handleCancelPress = () => {
        setSearchActive(false);
        setSearchTextValue('');
        setSearchText('');
        onSearch('');
    }

    return (
        <View className='flex flex-row bg-white items-center justify-center shadow-md shadow-black/50 px-4 pb-3 pt-8 border-b border-slate-100'>
            {!searchActive ? (
                <>
                    <Pressable onPress={() => router.push('/')}>
                        <Animated.View entering={FadeInLeft.duration(2000)} className='flex fixed flex-row justify-center items-center'>
                            <Image source={require('@/assets/images/icon.png')} className="w-8 h-8 rounded-md" />
                            <Text className='text-xl ml-2 font-PoppinsSemiBold text-black'>Live<Text className='text-primary font-PoppinsBold'>Post</Text></Text>
                        </Animated.View>
                    </Pressable>
                    {showSearch ? (
                        <Pressable onPress={handleSearchPress} className="ml-auto">
                            <FontAwesome name="search" size={20} color="black" />
                        </Pressable>
                    ) : null
                    }
                </>
            ) : (
                <Animated.View entering={FadeInRight.duration(2000)} className='flex flex-row justify-between items-center w-full'>
                    <TextInput
                        value={searchText}
                        placeholder="Search..."
                        onChangeText={handleSearchChange}
                        className="flex-1 text-black text-sm bg-white border border-slate-200 rounded-lg px-4 py-2"
                        autoFocus
                    />
                    <TouchableOpacity onPress={handleCancelPress}>
                        <Text className="ml-2 text-black">Cancel</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    );
};

export default HomeTabHeader;
