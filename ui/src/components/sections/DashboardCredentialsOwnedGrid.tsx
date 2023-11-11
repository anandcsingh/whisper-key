import Authentication from '@/modules/Authentication';
import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage';
import { CredentialMetadata, CredentialField } from '../../modules/CredentialMetadata';
import axios from "axios";

const DashBoardCredentialsOwnedGrid = () => {

    const [owned, setOwned] = useState({
        credentials: [] as any
    });

    useEffect(() => {

        (async () => {
    const apiURL = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/owned/${Authentication.address}`;

    const requestHeaders = { "Content-Type": "application/json" };
    let ownedCredentials: CredentialMetadata[] = [];
    axios.get(apiURL)
        .then(function (response) {
            // handle success
            console.log("Credentials/Owned - Success");
            console.log(response);
            ownedCredentials = response!.data! as CredentialMetadata[];
            setOwned({ ...owned, credentials: ownedCredentials });

            console.log("owned Credentials:" + ownedCredentials);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });



        })();

    }, []);



    // let ownedCredentials = [{name: "Driver's License", description: "Ministry of Works & Transport"}, 
    // {name: "Bsc. Computing", description: "The University of the West Indies"},
    // {name: "National ID", description: "EBC"},
    // {name: "Deed", description: "Ministry of Housing"},
    // {name: "Passport", description: "Ministry of Legal Affairs"},
    // {name: "Birth Certificate", description: "Ministry of Legal Affairs"}];
    //let licenseCredentialMetaData = {name: "License", description: "Ministry of Works and Transport License VC", fields: licenseCredentialFields};

    // let degreeCredentialFields = [{name: "Full Name", type: "string"}, {name: "Degree", type: "string"}];
    // let degreeCredentialMetaData = {name: "Degree", description: "UWI Degree VC", fields: degreeCredentialFields};

    // let credentialMetaDataList = [];
    // credentialMetaDataList.push(licenseCredentialMetaData);
    // credentialMetaDataList.push(degreeCredentialMetaData);

    return(
        <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden">
            {owned.credentials.length === 0 ? (
                <div className="text-center text-gray-600">You currently own 0 credentials.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {owned.credentials.map((credential: any, index: number) => (
                        <div key={index} className="bg-white p-4 shadow-lg rounded-md">
                            <h3 className="text-xl font-semibold">{credential.credentialType}</h3>
                            <p className="text-gray-600">{credential.description}</p>
                            <button className="btn btn-sm btn-primary">View Credential</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DashBoardCredentialsOwnedGrid;
