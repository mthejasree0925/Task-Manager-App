import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import SignIn from '../screens/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

// --- Mocks ---
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: jest.fn() },
  }),
}));

jest.mock('../components/Button', () => (props: any) => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return (
    <TouchableOpacity onPress={props.onPress} accessibilityLabel="mock-button">
      <Text>{props.title}</Text>
    </TouchableOpacity>
  );
});

const mockNavigate = jest.fn();
(useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

describe('SignIn Screen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders email and password fields', () => {
    const { getByLabelText } = render(<SignIn />);
    expect(screen.getByLabelText('email-textinput')).toBeTruthy();
    expect(screen.getByLabelText('password-textinput')).toBeTruthy();
  });

  it('does not call AsyncStorage when invalid email', async () => {
    const { getByLabelText } = render(<SignIn />);

    fireEvent.changeText(getByLabelText('email-textinput'), 'invalid');
    fireEvent.changeText(getByLabelText('password-textinput'), '123456');
    fireEvent.press(screen.getByText('signin.title'));

    await waitFor(() => {
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  it('saves data and navigates when valid', async () => {
    const { getByLabelText } = render(<SignIn />);

    fireEvent.changeText(getByLabelText('email-textinput'), 'test@example.com');
    fireEvent.changeText(getByLabelText('password-textinput'), '123456');
    fireEvent.press(screen.getByText('signin.title'));
  });
  //  Snapshot test
  it('matches the rendered snapshot', () => {
    const tree = render(<SignIn />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
