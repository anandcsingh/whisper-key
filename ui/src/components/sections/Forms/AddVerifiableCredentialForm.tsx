// midway iteration
import { useContext, useRef, useState } from "react";
import QRCodeScanner from "@/components/QRCodeScanner"
import Authentication from "@/modules/Authentication";
import AllMaWorkerEventsClient from "@/modules/workers/AllMaWorkerEventsClient";
import { Bool, CircuitString, Field, PublicKey, Struct } from 'o1js';
import { AuthContext } from "@/components/layout/AuthPage";
import Router from 'next/router';


const AddForm = () => {
  const addressRef = useRef(null);
  const [authState, setAuthState] = useContext(AuthContext);

  const [visibility, setVisibility] = useState('invisible');
  const [fieldTypeValue, setfieldTypeValue] = useState('');
  const handlefieldTypeValueChange = async (event: any) => {
    setfieldTypeValue(event.target.value);
  };

  const [rows, setRows] = useState([{ id: 1, name: '', type: 'String' }]);
  const [nextRowId, setNextRowId] = useState(2);

  const [vcNameValue, setvcNameValue] = useState('');
  const [vcDescriptionValue, setvcDescriptionValue] = useState('');
  const [fieldNameValue, setfieldNameValue] = useState('');

  const addAnotherField = () => {
    console.log("Adding another row to define fields...");
    setRows([...rows, { id: nextRowId, name: '', type: 'String' }]);
    setNextRowId(nextRowId + 1);
  };

  const removeRow = (id) => {
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

    let studentID = Authentication.address;
    console.log("studentID", studentID);
    let client = Authentication.zkClient! as AllMaWorkerEventsClient;
    console.log('client', client);
    console.log('adding Verifiable Credential...', vcNameValue, vcDescriptionValue);
    console.log(`fetching account ... ${Authentication.contractAddress} @ ${new Date().toLocaleTimeString()}}`);
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Fetching account, please wait this can take a few mins`, alertNeedsSpinner: true });

    await client.fetchAccount({ publicKey: PublicKey.fromBase58(Authentication.contractAddress) });
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Invoking contracts, please wait this can take a few mins`, alertNeedsSpinner: true });

    console.log(`fetching account done ${Authentication.contractAddress} @ ${new Date().toLocaleTimeString()}`);
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
          <input type="text" id="name" className="input input-bordered w-full max-w-xs" placeholder="Enter a name" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="text-base label-text">Description</span>
          </label>
          <input type="text" id="name" className="input input-bordered w-full max-w-xs" placeholder="Enter a description" />
        </div>
        
        <div className="form-section">
          <h3 className="text-3xl font-bold sm:text-4xl">Define fields</h3>
          {rows.map((row, index) => (
            <div key={row.id} className="form-row">
              <div className="form-control">
                <label className="label">
                  <span className="text-base label-text vc-fieldName">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  placeholder="Enter a description"
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
                  <option>String</option>
                  <option>Int</option>
                  <option>Decimal</option>
                  <option>Boolean</option>
                </select>
              </div>
              {rows.length > 1 && (
                <div>
                  <button onClick={() => removeRow(row.id)} className="btn btn-danger">
                    Remove
                  </button>
                </div>
              )}
              {index === rows.length - 1 && (
                <div>
                  <button onClick={addAnotherField} className="btn btn-accent">
                    Add Another
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
                
                
        <div className=''>
          <button onClick={addVeriableCredential} className="btn btn-accent">Add Verifiable Credential</button>
        </div>
      </div>

    </div>
  );
}
export default AddForm;