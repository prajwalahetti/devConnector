import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment } from "react";
import Momemnt from "react-moment";

const Education = ({ education }) => {
    
    const educations =  education.map((exp) => (
        <tr key={exp._id}>
          <td>{exp.school}</td>
          <td className="hide-sm">{exp.feildofstudy}</td>
          <td>
        <Momemnt format="YYYY/MM/DD">{exp.from}</Momemnt>
        {exp.to === null ? (
          "Present"
        ) : (
          <Momemnt format="YYYY/MM/DD">{exp.to}</Momemnt>
        )}
      </td>
      <td>
        <button
          
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
    education:PropTypes.array.isRequired
};

export default Education;
