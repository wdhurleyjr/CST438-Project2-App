import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../../src/views/login'; // Adjust the path as necessary

describe('Login Screen', () => {
  it('should render login screen correctly', () => {
    const { getByPlaceholderText } = render(<Login />);
    expect(getByPlaceholderText('Username')).toBeTruthy(); // Update placeholder as needed
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('should display error on invalid credentials', () => {
    const { getByText, getByPlaceholderText } = render(<Login />);
    fireEvent.changeText(getByPlaceholderText('Username'), 'invalidUser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongPassword');
    fireEvent.press(getByText('Login'));

    expect(getByText('Invalid credentials')).toBeTruthy(); // Adjust based on your error message
  });
});
