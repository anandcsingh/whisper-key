// midway iteration
import { useContext, useRef, useState } from "react";
import QRCodeScanner from "@/components/QRCodeScanner"
import Authentication from "@/modules/Authentication";
import AllMaWorkerEventsClient from "@/modules/workers/AllMaWorkerEventsClient";
import { Bool, CircuitString, Field, PublicKey, Struct } from 'o1js';
import { AuthContext } from "@/components/layout/AuthPage";
import Router from 'next/router';
// import {CredentialMetadata, CredentialField} from "../../../../../mentat/src/CredentialMetadata";
import axios from "axios";
//import { defineComponent } from "vue";

const apiUrl = "http://localhost:3001/api/credentials";

const AddForm = () => {
  const addressRef = useRef(null);
  const [authState, setAuthState] = useContext(AuthContext);

  const [visibility, setVisibility] = useState('invisible');
  const [fieldTypeValue, setfieldTypeValue] = useState('');
  const handlefieldTypeValueChange = async (event: any) => {
    setfieldTypeValue(event.target.value);
  };

  const [rows, setRows] = useState([{ id: 1, name: '', type: 'CircuitString' }]);
  const [nextRowId, setNextRowId] = useState(2);

  const [vcNameValue, setVCNameValue] = useState('');
  const [vcDescriptionValue, setVCDescriptionValue] = useState('');
  const [fieldNameValue, setfieldNameValue] = useState('');

  const handleVCNameChange = async (event: any) => {
    setVCNameValue(event.target.value);
  };

  const handleVCDescriptionChange = async (event: any) => {
    setVCDescriptionValue(event.target.value);
  };
  

  const addAnotherField = () => {
    console.log("Adding another row to define fields...");
    setRows([...rows, { id: nextRowId, name: '', type: 'CircuitString' }]);
    setNextRowId(nextRowId + 1);
  };

  const removeRow = (id: any) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  const handleChange = (id: number, field: string, value: string) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const addVeriableCredential = async (event: any) => {

    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Adding Verifiable Credential, please wait this can take a few mins`, alertNeedsSpinner: true });
    Router.back();
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    console.log("Name: ", vcNameValue);
    console.log("Description: ", vcDescriptionValue);
    console.log("Field Name: ", fieldNameValue);
    console.log("Field Type: ", fieldTypeValue);

    // let studentID = Authentication.address;
    // console.log("studentID", studentID);
    // let client = Authentication.zkClient! as AllMaWorkerEventsClient;
    // console.log('client', client);
    // console.log('adding Verifiable Credential...', vcNameValue, vcDescriptionValue);
    // console.log(`fetching account ... ${Authentication.contractAddress} @ ${new Date().toLocaleTimeString()}}`);
    // setAuthState({ ...authState, alertAvailable: true, alertMessage: `Fetching account, please wait this can take a few mins`, alertNeedsSpinner: true });

    // await client.fetchAccount({ publicKey: PublicKey.fromBase58(Authentication.contractAddress) });
    // setAuthState({ ...authState, alertAvailable: true, alertMessage: `Invoking contracts, please wait this can take a few mins`, alertNeedsSpinner: true });

    // console.log(`fetching account done ${Authentication.contractAddress} @ ${new Date().toLocaleTimeString()}`);

    // let credentialFields = Array<CredentialField>();
    // if(rows[0].name !== ""){
    //   rows.forEach(element => {
    //     credentialFields.push(new CredentialField(element.name, "", element.type));
    //   });
    // }
    // console.log(credentialFields);

    let credentialFields = Array<Object>();
      
    //let vcID = crypto.randomBytes(16).toString("hex"),
    if(rows[0].name !== ""){
      rows.forEach(element => {
        credentialFields.push({name: element.name, description: "", type: element.type});
      });
    }
    let credentialMetaData = {
      name: vcNameValue, 
      description: vcDescriptionValue, 
      owner: Authentication.address ?? "2n1VVuNBQof37isET7MBTPkD5VRfE7T8xRpKtD1BAinfy1GuQWux", 
      created: new Date().toISOString(),
      version: "1.0",
      fields: credentialFields
    };
    console.log(credentialFields);
    console.log(credentialMetaData);
    const requestHeaders = { "Content-Type": "application/json" };
    let data = credentialMetaData;// JSON.stringify(credentialMetaData);
    
    console.log(data);
    // const request = await axios.post(apiUrl, data, {
    //   headers: requestHeaders,
    // });

    axios.post(apiUrl, data)
    .then(res => {
      console.log("VC added");
      console.log(res);
      console.log(res.data);
       setAuthState({ ...authState, alertAvailable: true, alertMessage: `Adding credential please check back later`, alertNeedsSpinner: false });

    })
    .catch(err => {
      // Handle error
      console.log("Something went wrong.");
      console.log(data);
      console.log(err.toJSON());
  });


  //   let result = await client.add(studentID, rankValue, disciplineValue);
  //   console.log("result", result);
  //   if (result && result.success) {
  //     console.log("result", result);
  //     console.log("proving update transaction...");
  //     setAuthState({ ...authState, alertAvailable: true, alertMessage: `Proving transaction, please wait this can take a few mins`, alertNeedsSpinner: true });

  //     await client.proveUpdateTransaction();
  //     console.log("sending transaction...");
  //     setAuthState({ ...authState, alertAvailable: true, alertMessage: `Sending transaction, please approve the transaction on your wallet`, alertNeedsSpinner: true });

  //     let hash = await client.sendTransaction();
  //     console.log("transaction sent");


  //     // if hash is not empty or null, then we have a transaction hash
  //     if (hash) {
  //       let hashStr = `https://berkeley.minaexplorer.com/transaction/${hash}`;
  //       let hashlink = `<a href="${hashStr}" class="btn btn-sm" target="_blank">View transaction</a>`;
  //       console.log("transaction", hashStr);

  //       result = await client.updateBackingStore(disciplineValue);
  //       console.log("result", result);

  //       if (result.success) {
  //         setAuthState({ ...authState, alertAvailable: true, alertMessage: `Add martial art transaction submitted ${hashlink}`, alertNeedsSpinner: false });
  //       }
  //       else {
  //         setAuthState({ ...authState, hasAlert: true, alertMessage: result.message, needsLoading: false });
  //       }
  //     }
  //     else {
  //       setAuthState({ ...authState, hasAlert: true, alertMessage: `Add martial art transaction failed, try again later`, needsLoading: false });
  //     }
  //   }
  }

  return (
    <div>
      <h2 className='text-3xl font-bold sm:text-4xl'>Create Verifiable Credential</h2>
      <div className='divider'></div>
      <div className='grid grid-cols-1 space-y-6'>
        <div className="form-control">
          <label className="label">
            <span className="text-base label-text">Name</span>
          </label>
          <input type="text" id="name" onChange={handleVCNameChange} className="input input-bordered w-full max-w-xs" placeholder="Enter verifiable credential name" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="text-base label-text">Description</span>
          </label>
          <input type="text" id="name" onChange={handleVCDescriptionChange} className="input input-bordered w-full max-w-xs" placeholder="Enter a description" />
        </div>
        
        <div className="form-section">
          <h3 className="text-2xl font-bold sm:text-3xl">Define fields</h3>
          {/* <div className="grid grid-cols-3 gap-4"> */}
          {rows.map((row, index) => (
            <div key={row.id} className="form-row grid grid-cols-4 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="text-base label-text vc-fieldName">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Enter field name."
                  value={row.name}
                  onChange={(e) => handleChange(row.id, 'name', e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="text-base label-text vc-fieldName">Type</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  value={row.type}
                  onChange={(e) => handleChange(row.id, 'type', e.target.value)}
                >
                  <option>Field</option>
                  <option>Bool</option>
                  <option>CircuitString</option>
                  <option>PublicKey</option>
                </select>
              </div>
              {rows.length > 1 && (
                <div className="flex items-end">
                  {/* <button onClick={() => removeRow(row.id)} className="btn btn-danger">
                    Remove
                  </button> */}
                  <button className="btn btn-square" onClick={() => removeRow(row.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              )}
              {index === rows.length - 1 && (
                <div className="flex items-end">
                  <button onClick={addAnotherField} className="btn btn-sm btn-accent">
                    Add Another
                  </button>
                </div>
              )}
            </div>
          ))}
          {/* </div> */}
        </div>
                
                
        <div className=''>
          <button onClick={addVeriableCredential} className="btn btn-primary">Add Verifiable Credential</button>
        </div>
      </div>

    </div>
  );
}
export default AddForm;