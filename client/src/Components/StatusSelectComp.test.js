

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect'; // To use the `toBeInTheDocument` matcher
import StatusControls from './StatusSelectComp.js';

describe('StatusControls', () => {
  test('renders the dropdown with the correct initial value', () => {
    // Initial status is "Pending"
    render(<StatusControls status="Pending" handleStatusChange={() => {}} />);

    // Check that the select element is present in the document
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();

    // Check that the initial value is "Pending"
    expect(selectElement.value).toBe('Pending');
  });

  test('calls handleStatusChange when a new option is selected', () => {
    const handleStatusChange = jest.fn();

    render(<StatusControls status="Pending" handleStatusChange={handleStatusChange} />);

    // Select a new option
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'Running' } });

    // Check that handleStatusChange was called with the new value
    expect(handleStatusChange).toHaveBeenCalledWith('Running');
    expect(handleStatusChange).toHaveBeenCalledTimes(1);
  });

  test('updates the selected status when an option is selected', () => {
    const { rerender } = render(<StatusControls status="Pending" handleStatusChange={() => {}} />);

    // Select a new option
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'Failed' } });

    // Re-render with the updated status
    rerender(<StatusControls status="Failed" handleStatusChange={() => {}} />);

    // Check that the selected status is updated
    expect(selectElement.value).toBe('Failed');
  });

  test('renders the dropdown with correct options', () => {
    render(<StatusControls status="Pending" handleStatusChange={() => {}} />);

    // Check that all the options are present
    expect(screen.getByText('Pending')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Fail')).toBeInTheDocument();
    expect(screen.getByText('Complete')).toBeInTheDocument();
    expect(screen.getByText('Terminate')).toBeInTheDocument();
  });
});
