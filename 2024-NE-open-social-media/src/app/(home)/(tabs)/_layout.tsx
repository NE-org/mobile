import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '../../../constants/Colors';
import HomeTabHeader from '@/components/section-heading/home-header';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useClientOnlyValue } from '@/hooks/useClientOnlyValue';
import { useSearch } from '@/context/searchContext';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { setSearchText } = useSearch();

  const handleSearch = (text: string) => {
    setSearchText(text);
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: true,
          header: () => <HomeTabHeader onSearch={handleSearch} showSearch />,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      >
      </Tabs.Screen>
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create Post',
          headerShown: true,
          header: () => <HomeTabHeader onSearch={handleSearch} showSearch={false} />,
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
    </Tabs>
  );
}
