import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/colors.css';

import Welcome from './pages/Welcome';
import Information from './pages/Information';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import GPTIdea from './pages/GTPIdea';
import Idea from './pages/Idea';
import SignIn from './pages/SignIn';
import IdeasStudio from './pages/IdeasStudio';

function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Information" element={<Information />} />
        <Route path="/Idea" element={<Idea />} />
        <Route path="/GPTIdea" element={<GPTIdea />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/IdeasStudio" element={<IdeasStudio />} />
      </Routes>
      <Footer />
    </Fragment>
    // <Welcome />
  );
}

export default App;
