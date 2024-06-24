import React from 'react'
import Animated, { Easing, FadeIn } from 'react-native-reanimated'
import { Text } from '../shared/Themed'

const CustomTitleSection = ({ title, description, className }: { title: string, description: string, className?: string }) => {
    return (
        <Animated.View entering={FadeIn.duration(1500).easing(Easing.inOut(Easing.ease))} className={`flex flex-col items-start py-4 ${className} `}>
            <Text className='text-xl font-PoppinsSemiBold'>{title}</Text>
            <Text className='text-gray-400 font-PoppinsLight text-center'>{description}</Text>
        </Animated.View>
    )
}

export default CustomTitleSection