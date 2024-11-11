import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Nav from './Components/Nav';
import SignIn from './Components/SignIn';
import UserPage from './Components/UserPage';
import MakeConvention from './Components/MakeConvention';
import MakeTransfer from './Components/MakeTransfer';
import LandOfficer from './Components/LandOfficer';
import Login from './Components/Login';
import Logout from './Components/Logout';
import LandForSale from './Components/LandForSale';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user data exists in local storage
    const storedUser = localStorage.getItem('user');
    setIsLoggedIn(!!storedUser); // Set to true if user data is found
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<h1>Welcome</h1>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
          {isLoggedIn && (
            <>
              <Route path="/userpage" element={<UserPage />} />
              <Route path="/make_convention" element={<MakeConvention />} />
              <Route path="/make_transfer" element={<MakeTransfer />} />
              <Route path="/landofficer" element={<LandOfficer />} />
              <Route path="/landforsale" element={<LandForSale />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
