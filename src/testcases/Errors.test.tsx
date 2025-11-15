import React from 'react';
import { render, screen } from '@testing-library/react-native';
import ErrorsScreen from '../../src/screens/Errors';

jest.mock('../assets/errors.json', () => [
  { id: '1', message: 'Network error', ts: '2025-11-09T10:00:00Z' },
  { id: '2', message: 'Authentication failed', ts: '2025-11-09T11:00:00Z' },
]);

// Mock Card component (simplify for test)
jest.mock('../components/Card', () => ({
  Card: ({ children }: any) => {
    const React = require('react');
    const { View } = require('react-native');
    return <View accessibilityLabel="mock-card">{children}</View>;
  },
}));

describe('ErrorsScreen', () => {
   it('renders FlatList', () => {
    const { getByLabelText } = render(<ErrorsScreen />);
    expect(getByLabelText('errors-list')).toBeTruthy(); 
  });

  it('renders all error messages and timestamps', () => {
    render(<ErrorsScreen />);

    expect(screen.getByText('Network error')).toBeTruthy();
    expect(screen.getByText('Authentication failed')).toBeTruthy();
    expect(screen.getByText('2025-11-09T10:00:00Z')).toBeTruthy();
    expect(screen.getByText('2025-11-09T11:00:00Z')).toBeTruthy();
  });

//   it('renders items inside mocked Card components', () => {
//     render(<ErrorsScreen />);
//     const cards = screen.getAllByA11yLabel('mock-card');
//     expect(cards.length).toBe(2); // Same as mock data length
//   });

  //  Snapshot Test
  it('matches the rendered snapshot', () => {
    const tree = render(<ErrorsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
