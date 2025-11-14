import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Tasks from '../../src/screens/Tasks';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  t: (key: string) => key,
}));

const mockNavigate = jest.fn();
(useNavigation as jest.Mock).mockReturnValue({ navigate: mockNavigate });

describe('Tasks Screen', () => {
  it('renders and navigates to TaskDetails', () => {
    const { getByLabelText } = render(<Tasks />);
    // fireEvent.press(getByText('signin.tasks'));
    fireEvent.press(getByLabelText('title'));
    expect(mockNavigate).toHaveBeenCalledWith('TaskDetails');
  });
  //  Snapshot test
  it('matches the rendered snapshot', () => {
    const tree = render(<Tasks />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
