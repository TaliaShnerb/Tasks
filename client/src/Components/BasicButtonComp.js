import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../Style/BasicButtonComp.css'

export default function BasicButtons({ handleSaveStatusChanges, text }) {
    return (
        <Button variant="contained" onClick={handleSaveStatusChanges}>{text}</Button>
    );
}

