import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import SearchRecipe from './components/mealSearch';
import LoginPage from './components/LoginPage';
import DashBoard from './components/Dashboard';
import NotFound from './components/NotFound';
import RegisterPage from './components/RegisterPage';
import UpdateHealthGoal from './components/UpdateHealthGoal';
import LandingPage from './components/LandingPage';


function App() {
  //LANDING PAGE
  return (
    <div className="App">
      <nav className='flex justify-between items-center bg-green-500 p-5'>
        <Link to="/" className='bg-red-500 p-2'>Home</Link>
        <span className='flex gap-3'>
          <Link to="/dashboard" className='bg-red-500 p-2'>Acount</Link>
          <Link to="/login" className='bg-red-500 p-2'>Login</Link>
          <Link to="/updategoal" className='bg-red-500 p-2'>Update Goal</Link>
        </span>
      </nav>
      <LandingPage />
      <Routes>
        <Route path='/' element={<SearchRecipe />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/dashboard' element={<DashBoard />} />
        <Route path='/updategoal' element={<UpdateHealthGoal />} />
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;

