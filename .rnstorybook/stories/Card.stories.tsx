import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { Card } from '../../src/components/Card';
import { Text } from 'react-native';

// 👇 Default export defines metadata about your story
const meta: Meta<typeof Card> = {
  titleCard: 'Card',
  component: Card,
};

export default meta;

// 👇 Each named export is a story
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <Text>Hello! this is a card</Text>
    </Card>
  ),
};
