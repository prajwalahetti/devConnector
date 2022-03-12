import React from "react";
import PropTypes from "prop-types";
import "../../App.css";
import { connect } from "react-redux";
import { BrowserRouter,Route,Routes, Navigate } from "react-router-dom";

const PrivateRoute = ({component:Component,...rest}) => {

 return(
    <BrowserRouter>
    <div className="container">
      
    
     
    <Routes>
    <Route {...rest} render={(props)=>(<Component {...props}/>)} />
    </Routes>
   

     

     </div>
     </BrowserRouter>
 )
};

// PrivateRoute.propTypes = {
//   auth: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

export default PrivateRoute;

// const PrivateRoute = ({element : Component,auth:{isAuthenticated,loading},...rest}) => (
//     <Route {...rest} render={(props)=> (!isAuthenticated && !loading) ? (<Navigate to='/login' />) :(<Component {...props} />)}/>
// )
