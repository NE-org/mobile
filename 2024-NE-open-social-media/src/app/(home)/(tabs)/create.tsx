import AnimationSection from "@/components/shared/AnimationSection";
import { View } from "@/components/shared/Themed";
import { SafeAreaView, ScrollView } from "react-native";
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from "react";
import { usePostStore } from "@/hooks/store/usePosts";
import InputField from "@/components/shared/InputField";
import ShortError from "@/components/shared/ShortError";
import CustomButton from "@/components/shared/CustomButton";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import CustomTitleSection from "@/components/section-heading/auth-header";

export default function CreatePost() {
  const [isSubmitting, setSubmitting] = useState(false);
  const { addPost } = usePostStore();

  const validateSchema = z.object({
    title: z.string().min(5).max(255).trim().regex(/^[a-zA-Z0-9\s]*$/),
    body: z.string().min(6).max(255).trim().regex(/^[a-zA-Z0-9\s]*$/),
  });

  const { control, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: zodResolver(validateSchema),
    mode: 'onChange'
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      data.userId = 10;
      console.log('the data:', data)
      const response = await addPost(data);
      if (response !== null) {
        Toast.show({
          type: 'success',
          text1: 'Wow, Post Registered! 👋'
        });
        router.push('/(tabs)/');
      } else {
        Toast.show({
          type: 'error',
          text1: ` Failed to Post! 😡 `
        });
      }
      console.log(response);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'An unexpected error occurred during login. Please try again.'
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="bg-white flex flex-1 px-6 h-screen">
      <CustomTitleSection title="Create Post" description="Welcome to LivePost, Free Post !"/>
      <ScrollView>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              title="title"
              value={value}
              handleChangeText={onChange}
              placeholder='Enter your title'
              prefix='plus'
              onBlur={onBlur}
            />
          )}
          name='title'
        />

        {errors.title?.message && typeof errors.title.message === 'string' && (
          <ShortError error={errors.title.message} />
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              title="Body"
              value={value}
              handleChangeText={onChange}
              placeholder='Enter your body'
              prefix='plus'
              otherStyles='mt-4'
              onBlur={onBlur}
            />
          )}
          name='body'
        />

        {errors.body?.message && typeof errors.body.message === 'string' && (
          <ShortError error={errors.body.message} />
        )}

        <CustomButton
          title="Create Post"
          handlePress={handleSubmit(onSubmit)}
          containerStyles="bg-primary text-white mt-2"
          isLoading={isSubmitting}
        />
      </ScrollView>
    </SafeAreaView>
  );
}