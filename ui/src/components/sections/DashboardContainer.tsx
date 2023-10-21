import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage';
import DashboardContainerDataLoader from './DashboardContainerDataLoader';

export interface DashboardContainerProps {
    // Define any props you want to pass to the component here
    showDummyData: boolean;
    dummyDataIsInstructor: boolean;
  }
const DashboardContainer: React.FC<DashboardContainerProps> = ({ showDummyData, dummyDataIsInstructor }) => {

    const [authState, _]  = useContext(AuthContext);
    
    return (
        <>
        { authState.userAuthenticated && <DashboardContainerDataLoader showDummyData={showDummyData} dummyDataIsInstructor={dummyDataIsInstructor} /> }
        </>

    );
};

export default DashboardContainer;


