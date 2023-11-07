import Authentication from '@/modules/Authentication';
import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage';



const DashBoardIssueCredentials = () => {

    const issueVeriableCredential = async (event: any) => {

    }

    let licenseCredentialFields = [{name: "Full Name", type: "string"}, {name: "Permit Number", type: "string"}];
    let licenseCredentialMetaData = {name: "License", description: "Ministry of Works and Transport License VC", fields: licenseCredentialFields};

    let degreeCredentialFields = [{name: "Full Name", type: "string"}, {name: "Degree", type: "string"}];
    let degreeCredentialMetaData = {name: "Degree", description: "UWI Degree VC", fields: degreeCredentialFields};

    let credentialMetaDataList = [];
    credentialMetaDataList.push(licenseCredentialMetaData);
    credentialMetaDataList.push(degreeCredentialMetaData);
    return(
        
        <div>
            <a className="inline-block rounded btn-primary px-12 py-3 text-center text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400" href='#issue_credential_modal'>Issue Verifiable Credentials to Users</a>
            <div className='modals-area'>
                <dialog className="modal" id="issue_credential_modal">
                    <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                        <div className="modal-action">
                            <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
                        </div>
                        <div>
                            <h2>Issue Verifiable Credential</h2>
                            <div className="form-control">
                                <label className="label">
                                <span className="text-base label-text vc-fieldName">Type</span>
                                </label>
                                <select className="select select-bordered w-full max-w-xs">
                                {credentialMetaDataList.map((vc, index) => (
                                    <option key={vc.name}>{vc.name}</option>
                                ))};
                                </select>
                            </div>
                        </div>
                        <div className=''>
          <button onClick={issueVeriableCredential} className="btn btn-primary">Issue Verifiable Credential</button>
        </div>
                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>
                    
                    
              
    );
}

export default DashBoardIssueCredentials;
