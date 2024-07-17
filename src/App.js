import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/colors.css';

import Welcome from './pages/Welcome';

function App() {
  return (
    // <Fragment>
    //   <Routes>
    //     <Route exact path="/" element={<Welcome />} />
    //   </Routes>
    // </Fragment>
    <Welcome />
  );
}

export default App;
