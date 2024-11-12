import { Colors } from '@/constants/Colors';
import { todos$ } from '@/core/state';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TabBarIcon } from '@/ui/TabBarIcon';
import { use$ } from '@legendapp/state/react';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    const todos = use$(todos$);

    console.log('5 - TabLayout');

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                    ),
                    tabBarBadge: todos.length,
                }}
            />
            <Tabs.Screen
                name="users"
                options={{
                    title: 'Users',
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
