import React from 'react';
import { FlastListComponent } from '../src/components/FlatList';
import { View } from 'react-native';

export default {
  title: 'FlatListComponent',
  component: FlastListComponent,
};

const mockData = [
  { id: '1', title: 'Task 1', description: 'Do laundry', completed: false },
  { id: '2', title: 'Task 2', description: 'Buy groceries', completed: true },
];

export const Default = () => (
  <View style={{ flex: 1 }}>
    <FlastListComponent
      data={mockData}
      keyExtractor={(item) => item.id}
      renderTitle={(item) => item.title}
      renderDescription={(item) => item.description}
      isEditable
      onEdit={(item) => alert(`Edit ${item.title}`)}
      onDelete={(id) => alert(`Delete ${id}`)}
      onToggleComplete={(id) => alert(`Toggle ${id}`)}
    />
  </View>
);
