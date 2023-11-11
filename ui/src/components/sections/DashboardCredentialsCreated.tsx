import Authentication from '@/modules/Authentication';
import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage';
import { CredentialMetadata, CredentialField } from '../../modules/CredentialMetadata';
import axios from "axios";

const DashboardCredentialsCreated = () => {

    const [created, setCreated] = useState({
        credentials: [] as any
    });

    useEffect(() => {

        (async () => {
    const apiURL = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/created/${Authentication.address}`;

    const requestHeaders = { "Content-Type": "application/json" };
    let createdCredentials: CredentialMetadata[] = [];
    axios.get(apiURL)
        .then(function (response) {
            // handle success
            console.log("Get Credentials created - Success");
            console.log(response);
            createdCredentials = response!.data! as CredentialMetadata[];
            setCreated({ ...created, credentials: createdCredentials });

            console.log("created Credentials:" + createdCredentials);
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

    return(
        <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden">
            {created.credentials.length === 0 ? (
                <div className="text-center text-gray-600">You currently have 0 credentials created.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {created.credentials.map((credential: any, index: number) => (
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

export default DashboardCredentialsCreated;
