import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function Test() {
  return (
    <div>
    
    <Stack direction="row" spacing={2}>
      <Button variant="contained">Contained</Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" href="#contained-buttons">
        Link
      </Button>
    </Stack>
    <Typography variant="h1" gutterBottom>
        السلام عليكم 
      </Typography>
      
    </div>
  )
}

export default Test
