import './App.css';
import React ,{useEffect} from 'react'
import Landing from './components/layout/Landing';
import NavBar from './components/layout/NavBar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
// redux

import {Provider } from 'react-redux';
import store from './store';
const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser());
  },[])
  return (
    <Provider store={store}>
    <BrowserRouter>

      
      <NavBar/>
      <div style={{marginTop:"5rem"}}>
      <Alert/>
      </div>
      
      <Routes>
        
     <Route  path='/' element={<Landing/> }/>
     <Route  path='/register' element={<Register/>} />
      <Route   path='/login' element={<Login/>} />
      <Route path='/dashboard/*' component={<PrivateRoute component='Dashboard' />}></Route>
      </Routes>
   
    
      
      
      </BrowserRouter>
      </Provider>
    
    
  )
}

export default App
