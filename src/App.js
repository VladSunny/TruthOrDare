import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';

function App() {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1>Hello, world!</h1>
      <Button variant="contained">Contained</Button>
    </div>
  );
}

export default App;
