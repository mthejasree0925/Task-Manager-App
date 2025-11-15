
import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Platform, PlatformColor } from 'react-native';
import { Card } from './Card';
import { t } from 'i18next';

type FlatListProps<T> = {
  data: T[];
  keyExtractor: (item: T) => string;
  renderTitle: (item: T) => string;
  renderDescription?: (item: T) => string;
  onToggleComplete?: (id: string) => void;
  onEdit?: (item: T) => void;
  onDelete?: (id: string) => void;
  isEditable?: boolean;
};

export function FlastListComponent<T>({
  data,
  keyExtractor,
  renderTitle,
  renderDescription,
  onToggleComplete,
  onEdit,
  onDelete,
  isEditable = false,
}: FlatListProps<T>) {

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={({ item }) => (
        <Card>
          <View style={styles.item}>
            <Text style={item.completed ? styles.completedTitle : styles.title}>
              {renderTitle(item)}
            </Text>

            {renderDescription && (
              <Text
                style={item.completed ? styles.completedDescription : styles.description}
              >
                {renderDescription(item)}
              </Text>
            )}

            {isEditable && (
              <View style={styles.actionRow}>
                {onToggleComplete && (
                  <TouchableOpacity onPress={() => onToggleComplete(item.id)}>
                    <Text style={styles.actionBtn}>
                      {item.completed ? t('signin.markInComplete') : t('signin.markComplete')}
                    </Text>
                  </TouchableOpacity>
                )}
                {onEdit && (
                  <TouchableOpacity onPress={() => onEdit(item)}>
                    <Text style={styles.actionBtn}>{t('signin.update')}</Text>
                  </TouchableOpacity>
                )}
                {onDelete && (
                  <TouchableOpacity onPress={() => onDelete(item.id)}>
                    <Text style={styles.actionBtn}>{t('signin.delete')}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </Card>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No Tasks found. Add task from above form!</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 18,
    fontWeight: '600'
  },
  description: {
    color: '#666',
    marginTop: 4,
    marginBottom: Platform.OS === 'android'? 5:0,
  },
  completedTitle: {
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'line-through'
  },
  completedDescription: {
    color: '#aaa',
    textDecorationLine: 'line-through'
  },
  item: { padding: 10 },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 5,
  },
  actionBtn: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 0,
    marginLeft: 4,
    color: '#000',
    marginTop: Platform.OS === 'android'? 15: 0,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    marginTop: 8,
  },
});
