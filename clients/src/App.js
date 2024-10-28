import { BrowserRouter,Route,Routes} from 'react-router-dom';
import './App.css';
import Nav from './Components/Nav'
import SignIn from './Components/SignIn';
function App() {
  return (
    <div className="App"><BrowserRouter>
    <Nav />
   <Routes>

    <Route path='/' element={<h1>successfully logout</h1>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/userpage' element={<h1>userpage</h1>}/>
    <Route path='/make_convention' element={<h1>make_convention</h1>}/>
    <Route path='/make_transfer' element={<h1>make_transfer</h1>}/>
    </Routes>
    
    </BrowserRouter>
      <h1>Hi i made a mistake by joining this team</h1>
    </div>
  );
}

export default App;
