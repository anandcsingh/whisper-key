import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { Card } from 'flowbite-react';
// const propTypes = {
//     name: PropTypes.string,
//     rank: PropTypes.string,
//     martialArt: PropTypes.string,
//     certified: PropTypes.bool,
//     promotedDate: PropTypes.string,
// }

// const defaultProps = {
//     name: 'John Doe',
//     rank: 'White Belt',
//     martialArt: 'Jiu Jitsu',
//     certified: 'false',
//     promotedDate: '01/01/2021',
// }

const StudentTile = ({
    student,
    ...props
}) => {

  let shortName = (address) => {

    return address.substring(0, 5) + "..." + address.substring(address.length - 5, address.length);
  }

    return (
        <div className="card w-50 bg-white shadow-xl">
          <figure className="bg-gray-100"></figure>
          <div className="card-body">
            <h2 className="card-title">{shortName(student.publicKey)}</h2>
            <p className="text-primary">{student.rank}</p>
          </div>
        </div>      
    );
}

export default StudentTile;
