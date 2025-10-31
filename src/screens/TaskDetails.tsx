import { Button, FlatList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Card } from '../components/Card';
import MyButton from '../components/Button';

export default function TaskDetails() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errorDesc, setErrorDesc] = useState<string | null>(null);
  const [tasks, setTasks] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);


  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(tasks.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = tasks.slice(startIndex, endIndex);

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
        completed: false,
      };
      setTasks(prev => [...prev, newTask]);
    }
    // Clear form
    setTitle('');
    setDesc('');
    setEditingId(null);

    // Optionally reset to last page so new item shows up
    setCurrentPage(totalPages + (editingId ? 0 : 1));
    setIsAdded(true);
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
  // add this toggle handler
  const onToggleComplete = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
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
        data={pageItems}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card>
            <View style={styles.item}>
              <Text style={item.completed ? styles.completedTitle : styles.title}>{item.title}</Text>
              <Text style={item.completed ? styles.completedDescription : styles.description}>{item.description}</Text>
              {/* <Text>{item.completed ? 'Completed' : 'Incomplete'}</Text> */}


            {isAdded &&
              <View style={styles.actionRow}>
                {/* Toggle complete/incomplete button */}
                <TouchableOpacity onPress={() => onToggleComplete(item.id)}>
                  <Text style={styles.actionBtn}>
                    {item.completed ? "Mark Incomplete" : "Mark Complete"}
                  </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => startEdit(item)}>
                    <Text style={styles.actionBtn}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => onDelete(item.id)}>
                    <Text style={styles.actionBtn}>Delete</Text>
                  </TouchableOpacity>
              </View>
            }
          </View>
          </Card>



  )
}
ListEmptyComponent = {
          < View style = { styles.emptyContainer } >
  <Text style={styles.emptyText}>No tasks found. Add one above!</Text>
          </View >
        }
      />
  < View style = { styles.paginationRow } >


        <MyButton
          title="Previous"
          onPress={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={safePage === 1}

          buttonStyle={{ backgroundColor: '#4caf50' }}
          textStyle={{ color: '#fff' }}
        />
        <MyButton
          title="Next"
          onPress={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={safePage === totalPages}

          buttonStyle={{ backgroundColor: '#4caf50' }}
          textStyle={{ color: '#fff' }}
        />
      </View >





    </View >
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
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  pageInfo: {
    fontSize: 16,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  completedDescription: {
    color: '#aaa',
  },
});
