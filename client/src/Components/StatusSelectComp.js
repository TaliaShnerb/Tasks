// src/components/StatusControls.js

import React, { useState } from 'react';
import '../Style/StatusSelectComp.css'

const StatusControls = ({ status, handleStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState(status);

  // this function update the new status that selected for the selector and the stepper
  const handleChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    handleStatusChange(newStatus);
  };

  return (
    <div className="status-controls">
      <select value={selectedStatus} onChange={handleChange}>
        <option value="" disabled></option>
        <option value="Pending">Pending</option>
        <option value="Running">Start</option>
        <option value="Failed">Fail</option>
        <option value="Succeeded">Complete</option>
        <option value="Terminated">Terminate</option>
      </select>
    </div>
  );
};

export default StatusControls;
