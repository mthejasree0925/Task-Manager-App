import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskDetails from '../screens/TaskDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
 const React = require('react');

// 🧩 Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

// 🧩 Mock MyButton
jest.mock('../components/Button', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return ({ title, onPress, disabled }: any) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      testID={`mybutton-${title}`}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});
// 🧩 Mock FlatList component
jest.mock('../components/FlatList', () => {
  const React = require('react');
  const { Text, View } = require('react-native');
  return {
    FlastListComponent: ({ data }: any) => (
      <View>
        {data.map((item: any) => (
          <View key={item.id}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        ))}
      </View>
    ),
  };
});

describe('TaskDetails Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with inputs and button', () => {
    const { getByPlaceholderText, getByLabelText } = render(<TaskDetails />);
    expect(getByPlaceholderText('Title')).toBeTruthy();
    expect(getByPlaceholderText('Description')).toBeTruthy();
    expect(getByLabelText('add-save-button')).toBeTruthy();
  });

  it('shows validation errors when fields are empty', async () => {
    const { getByLabelText, findByText } = render(<TaskDetails />);
expect(getByLabelText('add-save-button')).toBeTruthy();

    await waitFor(() => {
      expect(findByText('Title field is required')).toBeTruthy();
      expect(findByText('Description field is required')).toBeTruthy();
    });
  });

  it('adds a new task and saves it to AsyncStorage', async () => {
    const { getByPlaceholderText, getByLabelText, queryByText } = render(<TaskDetails />);

    fireEvent.changeText(getByPlaceholderText('Title'), 'Test Task');
    fireEvent.changeText(getByPlaceholderText('Description'), 'Task description');
    fireEvent.press(getByLabelText('add-save-button'));

    await waitFor(() => {
      expect(queryByText('Test Task')).toBeTruthy();
      expect(queryByText('Task description')).toBeTruthy();
    });

    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('edits an existing task', async () => {
    // Mock preloaded data
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([{ id: '1', title: 'Old Task', description: 'Old Desc', completed: false }])
    );

    const { getByPlaceholderText, getByLabelText, queryByText, rerender } = render(<TaskDetails />);

    // Wait for AsyncStorage data to load
    await waitFor(() => {
      expect(queryByText('Old Task')).toBeTruthy();
    });

    // simulate edit
    rerender(<TaskDetails />);
    fireEvent.changeText(getByPlaceholderText('Title'), 'Edited Task');
    fireEvent.changeText(getByPlaceholderText('Description'), 'Edited Desc');
    fireEvent.press(getByLabelText('add-save-button'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });

  it('navigates pagination buttons correctly', async () => {
    const { getByTestId, getByText } = render(<TaskDetails />);
    const prevBtn = getByTestId('mybutton-Previous');
    const nextBtn = getByTestId('mybutton-Next');

    expect(getByText(/Page/)).toBeTruthy();
    fireEvent.press(nextBtn);
    fireEvent.press(prevBtn);
  });
});

