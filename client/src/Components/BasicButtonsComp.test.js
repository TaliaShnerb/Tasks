// src/components/BasicButtonComp.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BasicButtons from './BasicButtonComp.js';

describe('BasicButtons', () => {
  test('renders button with correct text', () => {
    render(<BasicButtons handleSaveStatusChanges={() => { }} text="Click Me" />);

    // Check that the button with the correct text is in the document   
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls handleSaveStatusChanges when button is clicked', () => {
    const handleSaveStatusChanges = jest.fn();
    render(<BasicButtons handleSaveStatusChanges={handleSaveStatusChanges} text="Click Me" />);

    // Click the button
    const buttonElement = screen.getByText('Click Me');
    fireEvent.click(buttonElement);

    // Check that handleSaveStatusChanges was called
    expect(handleSaveStatusChanges).toHaveBeenCalled();
    expect(handleSaveStatusChanges).toHaveBeenCalledTimes(1);
  });

});
