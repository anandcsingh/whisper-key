import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import StudentTile from './StudentTile';

// const StudentType = PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     rank: PropTypes.string.isRequired,
//     promotedDate: PropTypes.string.isRequired,
//   });

// const propTypes = {
//     studentList: PropTypes.arrayOf(StudentType).isRequired,
// }

// const defaultProps = {
//     studentList: [],
// }


const StudentList = ({
studentList,
    ...props
}) => {

  
    return (
        <div className="grid grid-cols-4 gap-4">
            {studentList.map((student, index) => (
                <StudentTile key={index} student={student} />
            ))}
        </div>
    );
}

export default StudentList;
