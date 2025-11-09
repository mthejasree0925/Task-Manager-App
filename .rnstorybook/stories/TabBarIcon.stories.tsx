import React from 'react';
import { View } from 'react-native';
import { Meta, StoryObj } from '@storybook/react';
import { TabBarIcon } from '../../src/components/TabBarIcon';

const meta: Meta<typeof TabBarIcon> = {
  titleTabbarIcon: 'Components/TabBarIcon',
  component: TabBarIcon,
  argTypes: {
    name: {
      control: 'select',
      options: ['home', 'settings', 'favorite', 'person', 'search'], // few MaterialIcons examples
    },
    color: { control: 'color' },
    size: { control: { type: 'number', min: 12, max: 64, step: 2 } },
    focused: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: 20,
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TabBarIcon>;

export const Default: Story = {
  args: {
    name: 'home',
    color: '#007AFF',
    size: 32,
    focused: true,
  },
};

export const Unfocused: Story = {
  args: {
    name: 'home',
    color: '#007AFF',
    size: 32,
    focused: false,
  },
};

export const CustomColor: Story = {
  args: {
    name: 'favorite',
    color: '#E91E63',
    size: 40,
    focused: true,
  },
};

export const LargeIcon: Story = {
  args: {
    name: 'settings',
    color: '#4CAF50',
    size: 60,
    focused: true,
  },
};
