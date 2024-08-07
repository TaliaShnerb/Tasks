// src/components/TaskStepper.js

import React from 'react';
import { Stepper, Step, StepLabel, Typography, Box } from '@mui/material';
import '../Style/TaskStepperComp.css';

const steps = ['Pending', 'Running', 'Failed', 'Succeeded'];

const TaskStepper = ({ id, activeStep }) => {

    return (
        <Box sx={{ width: '50%' }}>
            <Typography variant="h6" gutterBottom>
                Task Progress
            </Typography>
            <Stepper id={'stepper' + id} activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel className={`step-label ${activeStep > index || activeStep == index ? 'step-completed' : ''}`} >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default TaskStepper;
