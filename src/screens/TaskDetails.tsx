import { Button, FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function TaskDetails() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errorDesc, setErrorDesc] = useState<string | null>(null);
  const [tasks, setTasks] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [editingId, setEditingId] = useState(null);

  //handle add task with validation
  const handleAddOrSaveTask = () => {
    if (title.trim().length > 0) {
      setIsAdded(true);
      setError('');
    } else {
      setError('Title field is required');
    }
    if (desc.trim().length > 0) {
      setIsAdded(true);

      setErrorDesc('');
    } else {
      setErrorDesc('Description field is required');
    }
    if (editingId) {
      // save update
      onUpdate(editingId, title.trim(), desc.trim());
    } else {
      // add new
      const newTask = {
        id: Date.now().toString(),
        title: title.trim(),
        description: desc.trim(),
      };
      setTasks(prev => [...prev, newTask]);
    }
    // Clear form
    setTitle('');
    setDesc('');
    setEditingId(null);
  };
  // Update task based on id
  const onUpdate = (id: string, newTitle: string, newDescription: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, title: newTitle, description: newDescription } : task
      )
    );
  };

  // Delete task
  const onDelete = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };
  // Start editing mode for a task
  const startEdit = (item: { id: string, title: string, description: string }) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDesc(item.description);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* Form for input such as title and description */}
      <View style={styles.form}>
        <TextInput placeholder="title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          accessibilityLabel="task-title" />
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        <TextInput placeholder="description"
          value={desc}
          onChangeText={setDesc}
          style={styles.input}
          accessibilityLabel="task-desc" />
        {errorDesc ? <Text style={{ color: 'red', marginBottom: 20 }}>{errorDesc}</Text> : null}
        {/* Add button */}

        <View style={{ marginTop: 20 }}>
          <Button
            title={editingId ? "Save" : "Add"}
            onPress={handleAddOrSaveTask}
            accessibilityLabel="add-save-button"
          />
        </View>
      </View>
      {/* flatlist for displaying list of taks */}
      <FlatList
        data={tasks}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (

          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
             <Text>{item.completed ? 'Completed' : 'Incomplete'}</Text>
            {isAdded &&
              <View style={styles.actionRow}>
                <TouchableOpacity onPress={() => startEdit(item)}>
                  <Text style={styles.actionBtn}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(item.id)}>
                  <Text style={styles.actionBtn}>Delete</Text>
                </TouchableOpacity>
              </View>
            }
          </View>

        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, },
  form: { marginBottom: 12 },
  input: { borderWidth: 1, padding: 8, marginVertical: 6 },
  item: { padding: 10 },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  actionBtn: {
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginLeft: 10,
    color: '#000',
  },
});
