import Authentication from '@/modules/Authentication';
import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage';

const DashBoardCredentialsOwned = () => {

    let ownedCredentials = [{name: "License", description: "Issued by the Ministry of Works &amp; Transport"}, 
    {name: "Bsc. Computing", description: "Issued by the University of the West Indies"},
    {name: "National ID", description: "Issued by the EBC"},
    {name: "Bsc. Computing", description: "Issued by the University of the West Indies"},
    {name: "Deed", description: "Issued by the Ministry of Housing"},
    {name: "Passport", description: "Issued by the Ministry of Legal Affairs"}];
    //let licenseCredentialMetaData = {name: "License", description: "Ministry of Works and Transport License VC", fields: licenseCredentialFields};

    // let degreeCredentialFields = [{name: "Full Name", type: "string"}, {name: "Degree", type: "string"}];
    // let degreeCredentialMetaData = {name: "Degree", description: "UWI Degree VC", fields: degreeCredentialFields};

    // let credentialMetaDataList = [];
    // credentialMetaDataList.push(licenseCredentialMetaData);
    // credentialMetaDataList.push(degreeCredentialMetaData);

    return(
        <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden">
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    
                    <div className="card w-96 bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title">License</h2>
                            <p>Issued by the Ministry of Works &amp; Transport</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">View Credential</button>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title">Bsc. Computing</h2>
                            <p>Issued by the University of the West Indies</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">View Credential</button>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title">National ID</h2>
                            <p>Issued by the EBC</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">View Credential</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle">❮</a> 
                    <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide2" className="carousel-item relative w-full">
                <div className="card w-96 bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title">National ID</h2>
                            <p>Issued by the EBC</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">View Credential</button>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title">Passport</h2>
                            <p>Issued by the Ministry of Legal Affairs</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">View Credential</button>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 bg-base-100">
                        <div className="card-body">
                            <h2 className="card-title">Deed</h2>
                            <p>Issued by the Ministry of Housing</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">View Credential</button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a> 
                    <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default DashBoardCredentialsOwned;
