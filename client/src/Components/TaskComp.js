import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined.js';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined.js';
import React, { useEffect, useState } from 'react';
import TaskStepper from './TaskStepperComp.js';
import StatusControls from './StatusSelectComp.js';
import BasicButtons from './BasicButtonComp.js';
import { Button, Stack, Typography } from '@mui/material';
import DescriptionAlerts from './DescriptionAlertComp.js';


const statusToStep = {
  'Pending': 0,
  'Running': 1,
  'Failed': 2,
  'Succeeded': 3,
  'Terminated': 4
};

const TaskProgress = ({ task }) => {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [completedDate, setCompletedDate] = useState(task.dateCompleted==null ? '':task.dateCompleted);
  const [submittedDate, setSubmittedDate] = useState(task.dateSubmitted==null ? '':task.dateSubmitted);
  const [successAlert, setSuccessAlert] = useState(false);
  const [severityAlert, setSeverityAlert] = useState('');
  const [msgAlert, setMsgAlert] = useState('');

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // display or remove the details
  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  // update the new status and the dates according to the status
  const handleStatusChange = (newStatus) => {
    console.log(newStatus);
    if (newStatus == "Succeeded") {
      setSubmittedDate(new Date());
    }
    if (newStatus == "Terminated") {
      setCompletedDate(new Date());
    }
    setStatus(newStatus);
  };
  // send post request to server for updated the data
  const handleSaveStatusChanges = async () => {
    let obj = {
      "id": task.id,
      "status": status,
      "dateSubmitted": new Date(submittedDate),
      "dateCompleted": new Date(completedDate)
    }
    const fetchParams = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj)
    }
    try {
      const response = await fetch('/saveChanges', fetchParams);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);
      setSuccessAlert(true);
      setSeverityAlert('success');
      setMsgAlert('The data has been updated successfully!')

    } catch (err) {
      setError(err.message);
      setSeverityAlert('error');
      setMsgAlert(err.message)
    }
  }

  const formatDateWithDots = (date) => {
    const day = String(date.getDate()).padStart(2, '0'); // יום
    const month = String(date.getMonth() + 1).padStart(2, '0'); // חודש (מתחיל מ-0)
    const year = date.getFullYear(); // שנה

    return `${day}.${month}.${year}`;
  };

  return (
    <div className="task-progress">
      <div className="task-header" >
        {
          !isExpanded && (<AddCircleOutlineOutlinedIcon id={task.id} onClick={toggleDetails} data-testid="add-icon" />)}
        {
          isExpanded && (<DoDisturbOnOutlinedIcon id={task.id} onClick={toggleDetails} data-testid="remove-icon" />)
        }
        <h2>{task.name}</h2>
      </div>
      <TaskStepper id={task.id} activeStep={statusToStep[status]} />
      {isExpanded && (
        <div className="task-details">
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1">
              <strong>Status:</strong>
            </Typography>
            <StatusControls status={status} handleStatusChange={handleStatusChange} />
            <BasicButtons handleSaveStatusChanges={handleSaveStatusChanges} text={"Save Changes"}></BasicButtons>
          </Stack>
          <p><strong>Task Details</strong></p>
          <p><strong>User:</strong> {task.user}</p>
          <p><strong>Group:</strong> {task.group}</p>
          <p><strong>Details:</strong> {task.details}</p>
          {submittedDate && <p id={'submittedDate' + task.id}><strong>Date Submitted:</strong> {formatDateWithDots(new Date(submittedDate))}</p>}
          {completedDate && <p id={'completedDate' + task.id}><strong>Date Completed:</strong> {formatDateWithDots(new Date(completedDate))} </p>}
        </div>
      )}
      {successAlert && <DescriptionAlerts id={'alert' + task.id} successAlert={successAlert} severity={severityAlert} msg={msgAlert} />}
    </div>
  );
};

export default TaskProgress;
