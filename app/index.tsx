  // App.tsx
import React from 'react';
import StorybookUI from '../.rnstorybook';
import MyApp from '../App';

const isStorybook = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'ture';

export default function HomeScreen() {
  return isStorybook ? <StorybookUI /> : <MyApp />;
}