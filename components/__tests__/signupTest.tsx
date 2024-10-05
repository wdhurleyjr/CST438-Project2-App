import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Signup from '../../src/views/signup'; // Adjust the path as necessary

describe('Signup Screen', () => {
  it('should render signup screen correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Signup />);
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Signup')).toBeTruthy();
  });

  it('should show validation error on empty fields', () => {
    const { getByText } = render(<Signup />);
    fireEvent.press(getByText('Signup'));
    expect(getByText('Fields cannot be empty')).toBeTruthy(); // Modify based on your error message
  });
});
