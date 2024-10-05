import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../../src/views/home'; // Adjust the path based on your project structure

describe('Home Screen', () => {
  it('should display the header "Bestsellers"', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Bestsellers')).toBeTruthy();
  });

  it('should greet the user with "Welcome, user!"', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Welcome, user!')).toBeTruthy();
  });

  it('should render the "Fiction" section with book titles', () => {
    const { getByText } = render(<Home />);
    expect(getByText('FICTION')).toBeTruthy();
    // Check for sample book titles - adjust these to match actual titles
    expect(getByText('Book title')).toBeTruthy();
    expect(getByText('Author | New this week')).toBeTruthy();
  });

  it('should render the "Nonfiction" section with book titles', () => {
    const { getByText } = render(<Home />);
    expect(getByText('NONFICTION')).toBeTruthy();
    // Check for sample book titles in Nonfiction
    expect(getByText('Book title')).toBeTruthy();
    expect(getByText('Author | 3 weeks')).toBeTruthy();
  });

  it('should render the bottom navigation tabs', () => {
    const { getByText } = render(<Home />);
    // Assuming the bottom navigation tabs have labels such as 'Home', 'Search', 'Lists', 'Account'
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
    expect(getByText('Lists')).toBeTruthy();
    expect(getByText('Account')).toBeTruthy();
  });
});
