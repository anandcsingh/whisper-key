import Authentication from '@/modules/Authentication';
import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage';
import { CredentialMetadata, CredentialField } from '../../modules/CredentialMetadata';
import axios from "axios";
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const DashboardCredentialsCreated = () => {
    const router = useRouter();
    const [created, setCreated] = useState({
        credentials: [] as any,
        currentCredential: { fields: [] } as any,
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

    const setCurrentCredential = (credential: any) => {

        setCreated({ ...created, currentCredential: credential });
        console.log("current credential: ", credential);

        // navigate to the modal
        //router.push('#current_credential_modal');
        (document.getElementById('current_credential_modal') as any).showModal()
    }

    return (
        <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden">
            {created.credentials.length === 0 ? (
                <div className="text-center text-gray-600">You currently have 0 credentials created.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {created.credentials.map((credential: any, index: number) => (
                        <div key={index}>
                            <div className="bg-white p-4 shadow-lg rounded-md">
                                <h3 className="text-xl font-semibold">{credential.name}</h3>
                                <p className="text-gray-600">{credential.description}</p>
                                <button onClick={() => setCurrentCredential(credential)} className="btn btn-sm btn-primary">View Credential</button>
                            </div>

                        </div>
                    ))}
                </div>
            )}

            <div className='modals-area'>
                <dialog className="modal" id="current_credential_modal">
                    <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                        <div className="modal-action">
                            <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
                        </div>
                        <h2 className="text-2xl font-bold sm:text-2xl">Credential Name: {created.currentCredential.name}</h2><br />
                        <div>Owner: {created.currentCredential.owner}</div>
                        <div>Description: {created.currentCredential.description}</div> <br />
                        <h2 className="text-2xl font-bold sm:text-2xl">Fields:</h2>
                        {created.currentCredential.fields.map((field: CredentialField, index: number) => {
                            return (<div className='data-field' key={index}>
                                <div>Name: {field.name}</div>
                                <div>Type: {field.type}</div>
                            </div>)
                        })}
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
    );
}

export default DashboardCredentialsCreated;
