import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Tasks from '../screens/Tasks';

//  Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

//  Mock MyButton (if it's a custom RN wrapper)
jest.mock('../components/Button', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  return ({ title, onPress }: { title: string; onPress: () => void }) => (
    <TouchableOpacity onPress={onPress} testID="mybutton">
      <Text>{title}</Text>
    </TouchableOpacity>
  );
});

describe('Tasks Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<Tasks />);

    // Assert text is visible
    expect(
      getByText('Tasks screen with tabs!! Go to task details by clicking on Tasks!!')
    ).toBeTruthy();

    // Assert button is rendered
    expect(getByText('TASKS')).toBeTruthy();
  });

  it('navigates to TaskDetails when button is pressed', () => {
    const { getByText } = render(<Tasks />);

    const button = getByText('TASKS');
    fireEvent.press(button);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('TaskDetails');
  });
});
