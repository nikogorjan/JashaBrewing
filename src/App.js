import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './Routes/Home/Home';
import Shop from './Routes/Shop/Shop';
import axios from 'axios';
import slTranslation from './Resources/Translations/sl.json';
import enTranslation from './Resources/Translations/en.json';
import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import Pub from './Routes/Pub/Pub';
import Brewery from './Routes/Brewery/Brewery';
import Contact from './Routes/Contact/Contact';
import Admin from './Routes/Admin/Admin';
import Dashboard from './Routes/Admin/Components/Dashboard/Dashboard';
import AuthRoute from './Routes/Admin/Components/Auth/AuthRoute';
import Items from './Routes/Admin/Components/Dashboard/Items';
import ItemDetail from './Routes/Shop/Components/ItemDetail';
import { Provider } from 'react-redux';
import {store, persistor} from './StateManagement/store'
import { PersistGate } from 'redux-persist/integration/react';
import Cart from './Routes/Cart/Cart';
import Checkout from './Routes/Checkout/Checkout';
import Completion from './Payments/Completion';



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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize with the value stored in sessionStorage or default to false
    const storedAuthState = sessionStorage.getItem('isAuthenticated');
    return storedAuthState === 'true';
  });
  const handleLogin = () => {
    // Your authentication logic goes here
    // For now, let's simulate a successful login
    setIsAuthenticated(true);

    // Store authentication state in sessionStorage
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  useEffect(() => {
    // Check if authentication state is stored in sessionStorage
    const storedAuthState = sessionStorage.getItem('isAuthenticated');
    console.log(storedAuthState);
    if (storedAuthState === 'true') {
      setIsAuthenticated(true);
    }

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
        <React.StrictMode>

      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Shop' element={<Shop />} />
            <Route path='/Pub' element={<Pub />} />
            <Route path='/Brewery' element={<Brewery />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/Admin' element={<Admin onLogin={handleLogin} />} />
            <Route
              path="/Dashboard"
              element={<AuthRoute isAuthenticated={isAuthenticated} element={<Dashboard />} />}
            />
            <Route
              path="/Items/:categoryName"
              element={<AuthRoute isAuthenticated={isAuthenticated} element={<Items />} />} // Replace with the component you want to render
            />
            <Route
              path="/Shop/:itemName"
              element={<ItemDetail />} />
            
            <Route path='/Cart' element={<Cart />} />
            <Route path='/Checkout' element={<Checkout />} />
            <Route path='/completion' element={<Completion />} />

          </Routes>
        </Router>
        </PersistGate>

      </Provider>,
      </React.StrictMode>,

    </div>
  );
}

export default App;
