import './App.css';
import React,{Fragment} from 'react'
import Landing from './components/layout/Landing';
import NavBar from './components/layout/NavBar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter,Routes, Route, Router } from 'react-router-dom';


const App = () => {
  return (
    <Fragment>
    <BrowserRouter>

      
      <NavBar/>
     
      <Routes>
     <Route  path='/' element={<Landing/> }/>
     
     
     <Route  path='register' element={<Register/>} />
      <Route   path='login' element={<Login/>} />
     
     </Routes>
   
    
      
      
      </BrowserRouter>
      </Fragment>
    
    
  )
}

export default App

/* <BrowserRouter>
      <Fragment>
      <NavBar/>
      <Route  path='/' element={<Landing/> }/>
      <section className='container'>
      <Routes>
            <Route  path='/register' element={<Register/>} />
            <Route   path='/login' element={<Login/>} />
        </Routes>
        </section>
      </Fragment>
    </BrowserRouter>
     */