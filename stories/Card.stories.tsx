import React from 'react';
import { Card } from '../src/components/Card';
import { Text } from 'react-native';

export default {
  title: 'Card',
  component: Card,
};

export const Basic = () => (
  <Card>
    <Text>This is inside a card</Text>
  </Card>
);
