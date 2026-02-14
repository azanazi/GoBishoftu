
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Packages from './pages/Packages.tsx';
import Contact from './pages/Contact.tsx';
import Admin from './pages/Admin.tsx';
import TheCity from './pages/TheCity.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="the-city" element={<TheCity />} />
            <Route path="about" element={<About />} />
            <Route path="packages" element={<Packages />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          {/* Admin route moved outside Layout to have its own clean interface */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
