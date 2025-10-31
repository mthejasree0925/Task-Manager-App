import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card } from '../components/Card';
import MOCK_ERRORS from "../assets/errors.json";


export default function ErrorsScreen() {
  return (
    <View style={{flex:1, padding:12}}>
      <FlatList
        data={MOCK_ERRORS}
        accessibilityLabel='errors-list'
        keyExtractor={i => i.id}
        renderItem={({item}) => <Card><Text>{item.message}</Text><Text>{item.ts}</Text></Card>}
      />
    </View>
  );
}
