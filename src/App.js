import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/colors.css';

import Welcome from './pages/Welcome';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
      <Footer />
    </Fragment>
    // <Welcome />
  );
}

export default App;
