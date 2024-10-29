import { BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav'
import SignIn from './Components/SignIn';
import UserPage from './Components/UserPage';
import MakeConvention from './Components/MakeConvention';
import MakeTransfer from './Components/MakeTransfer';
import LandOfficer from './Components/LandOfficer';
function App() {
  return (
    <div className="App"><BrowserRouter>
    <Nav />
   <Routes>

    <Route path='/' element={<h1>successfully logout</h1>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/userpage' element={<UserPage/>}/>
    <Route path='/make_convention' element={<MakeConvention/>}/>
    <Route path='/make_transfer' element={<MakeTransfer/>}/>
    <Route path='/landofficer' element={<LandOfficer/>}/>
    </Routes>
    
    </BrowserRouter>
    
    </div>
  );
}

export default App;
