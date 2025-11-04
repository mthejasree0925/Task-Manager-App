import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import SignOut from '../screens/SignOut';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

// 🧩 Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  removeItem: jest.fn(() => Promise.resolve()),
}));

// 🧩 Mock navigation
const mockDispatch = jest.fn();
jest.mock('@react-navigation/native', () => ({
  CommonActions: {
    reset: jest.fn((payload) => payload),
  },
  useNavigation: () => ({
    dispatch: mockDispatch,
  }),
}));

describe('SignOut Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the "Signing out..." message', () => {
    const { getByText } = render(<SignOut />);
    expect(getByText('Signing out...')).toBeTruthy();
  });

  it('calls AsyncStorage.removeItem for all user keys', async () => {
    render(<SignOut />);

    await waitFor(() => {
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@user_email');
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@user_role');
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@user_logged_in');
      expect(AsyncStorage.removeItem).toHaveBeenCalledTimes(3);
    });
  });

  it('navigates to SignIn screen after sign-out', async () => {
    render(<SignOut />);

    await waitFor(() => {
      expect(CommonActions.reset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });

      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
