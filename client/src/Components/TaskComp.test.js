// TaskProgress.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TaskProgress from './TaskComp.js';
import { AddCircleOutlineOutlined as AddIcon, DoDisturbOnOutlined as RemoveIcon } from '@mui/icons-material';

// Mock data
const mockTask = {
  id: '1',
  name: 'Test Task',
  status: 'Pending',
  user: 'User1',
  group: 'Group1',
  details: 'Task Details',
  dateSubmitted: new Date().toISOString(),
  dateCompleted: null,
};

describe('TaskProgress Component', () => {
  test('should toggle between Add and Remove icons when clicked', () => {
    // Render component
    render(<TaskProgress task={mockTask} />);

    // Check initial state: should have AddIcon
    const addIcon = screen.getByTestId('add-icon');
    expect(addIcon).toBeInTheDocument();
    expect(screen.queryByText('Task Details')).toBeNull();

    // Click the AddIcon to expand
    fireEvent.click(addIcon);

    // After clicking, the icon should change to RemoveIcon and details should be visible
    expect(screen.queryByTestId('add-icon')).not.toBeInTheDocument();

    // Click the RemoveIcon to collapse
    const removeIcon = screen.getByTestId('remove-icon'); 
    fireEvent.click(removeIcon);

    // After clicking again, the icon should change back to AddIcon and details should be hidden
    expect(screen.getByTestId('add-icon')).toBeInTheDocument();
    expect(screen.queryByText('Task Details')).toBeNull();
  });
});
