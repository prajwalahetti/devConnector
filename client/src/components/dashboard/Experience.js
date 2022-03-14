import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment } from "react";
import Momemnt from "react-moment";

const Experience = ({ experience }) => {
    
    const experiences = 5;
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
    experience:PropTypes.array.isRequired
};

export default Experience;
