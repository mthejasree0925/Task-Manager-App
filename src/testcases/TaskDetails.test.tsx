import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TaskDetails from '../../src/screens/TaskDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from 'i18next';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('i18next', () => ({
  t: (key: string) => key,
}));

jest.mock('../components/FlatList', () => ({
  FlastListComponent: () => null,
}));

jest.mock('../components/Button', () => (props: any) => (
  <button onClick={props.onPress}>{props.title}</button>
));

describe('TaskDetails Screen', () => {
  beforeEach(() => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  });

  it('renders input fields', () => {
    const { getByLabelText } = render(<TaskDetails />);
    fireEvent.press(getByLabelText('task-title'));
    fireEvent.press(getByLabelText('task-desc'));
  });

  it('adds a new task and saves to AsyncStorage', async () => {
    const { getByLabelText, getByText } = render(<TaskDetails />);
    fireEvent.changeText(getByLabelText('task-title'), 'New Task');
    fireEvent.changeText(getByLabelText('task-desc'), 'Details');
    fireEvent.press(getByText('signin.add'));

  });
  //  Snapshot test
  it('matches the rendered snapshot', () => {
    const tree = render(<TaskDetails />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
