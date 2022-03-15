import "./App.css";
import React, { useEffect } from "react";
import Landing from "./components/layout/Landing";
import NavBar from "./components/layout/NavBar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import CreateProfile from "./components/profile-forms/CreateProfile";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
// redux

import { Provider } from "react-redux";
import store from "././app/store";
import setAuthToken from "./utils/setAuthToken";

if(localStorage.token){
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <div style={{ marginTop: "5rem" }}>
          <Alert />
        </div>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path="/create-profile"
            element={<PrivateRoute component={CreateProfile} />}
          />
          <Route
            path="/edit-profile"
            element={<PrivateRoute component={EditProfile} />}
          />
          <Route
            path="/add-experience"
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route
            path="/add-education"
            element={<PrivateRoute component={AddEducation} />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
