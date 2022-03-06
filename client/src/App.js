import './App.css';
import React,{Fragment} from 'react'
import Landing from './components/layout/Landing';
import NavBar from './components/layout/NavBar';
const App = () => {
  return (
    <Fragment>
      <NavBar></NavBar>
      <Landing/>
      </Fragment>
  )
}

export default App
