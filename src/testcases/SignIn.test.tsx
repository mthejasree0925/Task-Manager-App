import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignIn from '../screens/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

// Mock USERS data
jest.mock('../assets/login-credentials.json', () => [
  { email: 'user@tietoevry.com', password: 'password123', role: 'employee' },
]);

describe('SignIn Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('shows errors when fields are empty', async () => {
    const { getByText } = render(<SignIn />);
    const submitBtn = getByText('Submit');

    fireEvent.press(submitBtn);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('invalid credentials!');
    });
  });

  it('shows email validation error for invalid email format', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<SignIn />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'invalidEmail');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(queryByText('Enter a valid email')).toBeTruthy();
      expect(Alert.alert).toHaveBeenCalledWith('invalid credentials!');
    });
  });

  it('shows password error for short password', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<SignIn />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'user@tietoevry.com');
    fireEvent.changeText(getByPlaceholderText('Password'), '123');
    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(queryByText('Password must be at least 6 characters')).toBeTruthy();
      expect(Alert.alert).toHaveBeenCalledWith('invalid credentials!');
    });
  });

  it('alerts for invalid login credentials', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'wrong@tietoevry.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Invalid login',
        'Email or password is incorrect'
      );
    });
  });

  it('navigates to Tasks screen on successful login', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'user@tietoevry.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledTimes(3);
      expect(mockNavigate).toHaveBeenCalledWith('Tasks', {
        role: { email: 'user@tietoevry.com', password: 'password123', role: 'employee' },
      });
    });
  });
});
