import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import Card from './Card'; // Adjust the import path if needed

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <View style={{ padding: 16 }}>{children}</View>
);

storiesOf('Card', module)
  .addDecorator((story) => <Wrapper>{story()}</Wrapper>)
  .add('Default', () => (
    <Card title="Welcome" description="This is a default card." />
  ))
  .add('With Image', () => (
    <Card
      title="Image Card"
      description="This card includes an image."
      imageSource={{ uri: 'https://placekitten.com/300/200' }}
    />
  ))
  .add('Long Description', () => (
    <Card
      title="Detailed Card"
      description="This card has a longer description to test text wrapping and layout behavior in Storybook."
    />
  ));
