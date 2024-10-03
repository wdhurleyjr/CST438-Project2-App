import React from 'react';
import { render } from '@testing-library/react-native';
import Landing from '../../src/views/landing'; // Adjust the path as necessary

describe('Landing Screen', () => {
  it('should render the landing view correctly', () => {
    const { getByText } = render(<Landing />);
    expect(getByText('Welcome to the App')).toBeTruthy(); // Change text based on your component content
  });

  it('should have a login button', () => {
    const { getByText } = render(<Landing />);
    expect(getByText('Login')).toBeTruthy(); // Modify text according to your button text
  });
});
