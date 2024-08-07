import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import '../Style/DescriptionAlertComp.css';


export default function DescriptionAlerts({ id, successAlert, severity, msg }) {
  const [open, setOpen] = useState(successAlert);

  // Effect to auto-hide the alert after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 10000);

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  return (
    <div className="alert-container">
      <Stack sx={{ width: '100%' }} spacing={2}>
        {open && (          
            <Alert id={id} severity={severity}>
              <AlertTitle>{severity}</AlertTitle>
              {msg}
            </Alert>          
        )}
      </Stack>
    </div>
  );
}
