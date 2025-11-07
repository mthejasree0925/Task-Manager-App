import React from 'react';
import { Card } from '../../src/components/Card';
import { Text } from 'react-native';

export default {
  titleCard: 'Card',
  component: Card,
};

export const Basic = () => (
  <Card>
    <Text>This is inside a card</Text>
  </Card>
);
