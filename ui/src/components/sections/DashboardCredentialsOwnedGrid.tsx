import Authentication from '@/modules/Authentication';
import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage';

const DashBoardCredentialsOwnedGrid = () => {

    let ownedCredentials = [{name: "Driver's License", description: "Ministry of Works & Transport"}, 
    {name: "Bsc. Computing", description: "The University of the West Indies"},
    {name: "National ID", description: "EBC"},
    {name: "Deed", description: "Ministry of Housing"},
    {name: "Passport", description: "Ministry of Legal Affairs"},
    {name: "Birth Certificate", description: "Ministry of Legal Affairs"}];
    //let licenseCredentialMetaData = {name: "License", description: "Ministry of Works and Transport License VC", fields: licenseCredentialFields};

    // let degreeCredentialFields = [{name: "Full Name", type: "string"}, {name: "Degree", type: "string"}];
    // let degreeCredentialMetaData = {name: "Degree", description: "UWI Degree VC", fields: degreeCredentialFields};

    // let credentialMetaDataList = [];
    // credentialMetaDataList.push(licenseCredentialMetaData);
    // credentialMetaDataList.push(degreeCredentialMetaData);

    return(
        <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {ownedCredentials.map((credential, index) => (
                    <div key={index} className="bg-white p-4 shadow-lg rounded-md">
                        <h3 className="text-xl font-semibold">{credential.name}</h3>
                        <p className="text-gray-600">{credential.description}</p>
                        <button className="btn btn-sm btn-primary">View License</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DashBoardCredentialsOwnedGrid;
