import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState, useContext } from "react";
import {AuthContext} from '@/components/layout/AuthPage'

import QRCodeCreator from '@/components/QRCodeCreator';
const ManagePage = () => {

    const { state, setState } = useContext(AuthContext);

    return (
        <div className="g">
            <h1>Manage Page</h1>
            {state.hasBeenSetup ?
            <div>
            <QRCodeCreator ></QRCodeCreator>
            </div>
            : <p>Not setup</p>
    }
        </div>
    );
}

export default ManagePage;
