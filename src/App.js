import './App.css';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import Home from './Routes/Home/Home';
import Shop from './Routes/Shop/Shop';
import axios from 'axios';
import slTranslation from './Resources/Translations/sl.json';
import enTranslation from './Resources/Translations/en.json';
import { useEffect } from 'react';
import i18n from 'i18next';
import Pub from './Routes/Pub/Pub';
import Brewery from './Routes/Brewery/Brewery';
import Contact from './Routes/Contact/Contact';

i18n.init({
  resources: {
    en: { translation: enTranslation },
    sl: { translation: slTranslation },
  },
  fallbackLng: 'sl',
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  useEffect(() => {
    axios
      .get("https://ipinfo.io")
      .then((response) => {
        const userLocation = response.data.country;
        const defaultLanguage = userLocation === 'SI' ? 'sl' : 'en';

        i18n.changeLanguage(defaultLanguage);
      })
      .catch((error) => {
        console.error('Error fetching user location:', error);
        // Fallback logic in case of an error, set a default language
        i18n.changeLanguage('sl');
      });
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Shop' element={<Shop/>}/>
          <Route path='/Pub' element={<Pub/>}/>
          <Route path='/Brewery' element={<Brewery/>}/>
          <Route path='/Contact' element={<Contact/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
