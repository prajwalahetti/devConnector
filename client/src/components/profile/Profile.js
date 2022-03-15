import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../../App.css";
const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
    const {id}=useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById,id]);
  return (
    <div className="container">
      {profile === null ? <Spinner /> : <Fragment>
         <Link to='/profiles' className="btn btn-light">
             Back to Profiles
         </Link>
         {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          </Fragment>}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});
export default connect(mapStateToProps, { getProfileById })(Profile);
