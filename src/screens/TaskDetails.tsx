import { Button, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import MyButton from '../components/Button';
import { FlastListComponent } from '../components/FlatList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from 'i18next';

export default function TaskDetails() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [errorDesc, setErrorDesc] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [pageItems, setPageItems] = useState<any[]>([]);
  const [safePage, setSafePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  //  Compute pagination whenever tasks or currentPage changes
  useEffect(() => {
    const computedTotalPages = Math.max(1, Math.ceil(tasks.length / itemsPerPage));
    const computedSafePage = Math.min(currentPage, computedTotalPages);
    const startIndex = (computedSafePage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const sliced = tasks.slice(startIndex, endIndex);

    if (currentPage !== computedSafePage) {
      setCurrentPage(computedSafePage);
    }
    setSafePage(computedSafePage);
    setTotalPages(computedTotalPages);
    setPageItems(sliced);
  }, [tasks, currentPage]);

  //  Load all saved tasks on startup
  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('TASKS');
        if (jsonValue != null) {
          const storedTasks = JSON.parse(jsonValue);
          setTasks(storedTasks);
          setCurrentPage(1);
        }
      } catch (e) {
        console.error('Error loading saved tasks:', e);
      }
    };

    loadData();
  }, []);

  //  Save entire tasks list whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('TASKS', JSON.stringify(tasks));
      } catch (e) {
        console.error('Error saving tasks:', e);
      }
    };

    if (tasks.length >= 0) saveData();
  }, [tasks]);

  //  Add or update a task
  const handleAddOrSaveTask = () => {
    let valid = true;
    if (title.trim().length === 0) {
      setError(t('signin.errorTitle'));
      valid = false;
    } else setError(null);

    if (desc.trim().length === 0) {
      setErrorDesc(t('signin.errorDesc'));
      valid = false;
    } else setErrorDesc(null);

    if (!valid) return;

    if (editingId) {
      // Update existing task
      setTasks(prev =>
        prev.map(task =>
          task.id === editingId ? { ...task, title: title.trim(), description: desc.trim() } : task
        )
      );
      setEditingId(null);
    } else {
      // Add new task
      const newTask = {
        id: Date.now().toString(),
        title: title.trim(),
        description: desc.trim(),
        completed: false,
      };
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);

      // Move to last page automatically
      const newTotalPages = Math.ceil(newTasks.length / itemsPerPage);
      setCurrentPage(newTotalPages);
    }

    // Reset form
    setTitle('');
    setDesc('');
  };

  //  Delete a task
  const onDelete = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  //  Edit a task
  const startEdit = (item: { id: string; title: string; description: string }) => {
    setEditingId(item.id);
    setTitle(item.title);
    setDesc(item.description);
  };

  //  Toggle completion
  const onToggleComplete = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

       {/* Task input form  */}
      <View style={styles.form}>
        <TextInput
          placeholder={t('signin.addTaskTitle')}
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          accessibilityLabel="task-title"
        />
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

        <TextInput
          placeholder={t('signin.addTaskDescription')}
          value={desc}
          onChangeText={setDesc}
          style={styles.input}
          accessibilityLabel="task-desc"
        />
        {errorDesc ? <Text style={{ color: 'red', marginBottom: 20 }}>{errorDesc}</Text> : null}

        <View style={{ marginTop: 20 }}>
          <Button
            title={editingId ? t('signin.save') : t('signin.add')}
            onPress={handleAddOrSaveTask}
            accessibilityLabel="add-save-button"
          />
        </View>
      </View>

      {/* Task List */}
      <FlastListComponent
        data={pageItems}
        keyExtractor={(i) => i.id}
        renderTitle={(i) => i.title}
        renderDescription={(i) => i.description}
        onToggleComplete={onToggleComplete}
        onDelete={onDelete}
        onEdit={startEdit}
        isEditable
      />

      {/*  Pagination */}
      <View style={styles.paginationRow}>
        <MyButton
          title={t('signin.previous')}
          onPress={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={safePage <= 1}
          buttonStyle={{ backgroundColor: '#4caf50' }}
          textStyle={{ color: '#fff' }}
        />

        <Text style={styles.pageInfo}>
          {t('signin.page')} {safePage} of {totalPages}
        </Text>

        <MyButton
          title={t('signin.next')}
          onPress={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={safePage >= totalPages}
          buttonStyle={{ backgroundColor: '#4caf50' }}
          textStyle={{ color: '#fff' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
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
    color: '#333',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#777',
  },
  completedDescription: {
    color: '#aaa',
  },
});
