// midway iteration
import { useContext, useRef, useState } from "react";
import QRCodeScanner from "@/components/QRCodeScanner"
import Authentication from "@/modules/Authentication";
import AllMaWorkerClient from "@/modules/workers/AllMaWorkerClient";
import AllMaWorkerEventsClient from "@/modules/workers/AllMaWorkerEventsClient";
import { Bool, CircuitString, Field, PublicKey, Struct } from 'snarkyjs';
import { AuthContext } from "@/components/layout/AuthPage";
import Router from 'next/router';


const AddForm = () => {
  const addressRef = useRef(null);
  const [authState, setAuthState] = useContext(AuthContext);

  const [visibility, setVisibility] = useState('invisible');
  const [disciplineValue, setDisciplineValue] = useState('');
  const handleDiscipleineChange = async (event: any) => {
    setDisciplineValue(event.target.value);
  };
  const [rankValue, setRankValue] = useState('');
  const handleRankChange = async (event: any) => {
    setRankValue(event.target.value);
  };
  const [instructorValue, setInstructorValue] = useState('');
  const handleInstructorChange = async (event: any) => {
    setInstructorValue(event.target.value);
  };
  const [notifyInstructorValue, setNotifyInstructorValue] = useState('');
  const handleNotifyInstructorChange = async (event: any) => {
    setNotifyInstructorValue(event.target.value);
  };

  const startScan = async (event: any) => {
    setVisibility('visible');

  }
  const handleScan = async (event: any) => {
    if (event) {
      console.log(event);
      setInstructorValue(event);
      setVisibility('hidden');
    }
  }


  const addMartialArtist = async (event: any) => {

    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Adding Martial Artist, please wait this can take a few mins`, alertNeedsSpinner: true });
    Router.back();
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    console.log("Discipline: ", disciplineValue);
    console.log("Rank: ", rankValue);
    console.log("Instructor: ", instructorValue);
    console.log("Notify Instructor: ", notifyInstructorValue);

    let studentID = Authentication.address;
    console.log("studentID", studentID);
    let client = Authentication.zkClient! as AllMaWorkerEventsClient;
    console.log('client', client);
    console.log('adding martial art...', disciplineValue, rankValue);
    console.log(`fetching account ... ${Authentication.contractAddress} @ ${new Date().toLocaleTimeString()}}`);
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Fetching account, please wait this can take a few mins`, alertNeedsSpinner: true });

    await client.fetchAccount({ publicKey: PublicKey.fromBase58(Authentication.contractAddress) });
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Invoking contracts, please wait this can take a few mins`, alertNeedsSpinner: true });

    console.log(`fetching account done ${Authentication.contractAddress} @ ${new Date().toLocaleTimeString()}`);
    let result = await client.add(studentID, rankValue, disciplineValue);
    console.log("result", result);
    if (result && result.success) {
      console.log("result", result);
      console.log("proving update transaction...");
      setAuthState({ ...authState, alertAvailable: true, alertMessage: `Proving transaction, please wait this can take a few mins`, alertNeedsSpinner: true });

      await client.proveUpdateTransaction();
      console.log("sending transaction...");
      setAuthState({ ...authState, alertAvailable: true, alertMessage: `Sending transaction, please approve the transaction on your wallet`, alertNeedsSpinner: true });

      let hash = await client.sendTransaction();
      console.log("transaction sent");


      // if hash is not empty or null, then we have a transaction hash
      if (hash) {
        let hashStr = `https://berkeley.minaexplorer.com/transaction/${hash}`;
        let hashlink = `<a href="${hashStr}" class="btn btn-sm" target="_blank">View transaction</a>`;
        console.log("transaction", hashStr);

        result = await client.updateBackingStore(disciplineValue);
        console.log("result", result);

        if (result.success) {
          setAuthState({ ...authState, alertAvailable: true, alertMessage: `Add martial art transaction submitted ${hashlink}`, alertNeedsSpinner: false });
        }
        else {
          setAuthState({ ...authState, hasAlert: true, alertMessage: result.message, needsLoading: false });
        }
      }
      else {
        setAuthState({ ...authState, hasAlert: true, alertMessage: `Add martial art transaction failed, try again later`, needsLoading: false });
      }
    }
  }

  return (
    <div>
      <h2 className='text-3xl font-bold sm:text-4xl'>Add your martial art</h2>
      <div className='divider'></div>
      <div className='grid grid-cols-1 space-y-6'>
        <div className="form-control">
          <label className="label">
            <span className="text-base label-text">Marital Art discipline</span>
          </label>
          <select onChange={handleDiscipleineChange} className="select select-bordered w-full max-w-xs bg-white">
            <option>Select a Martial Art</option>
            <option>BJJ</option>
            <option>Judo</option>
            <option>Karate</option>
          </select>


        </div>
        <div className="form-control">
          <label className="label">
            <span className="text-base label-text">Marital Art rank</span>
          </label>
          <select onChange={handleRankChange} className="select select-bordered w-full max-w-xs bg-white">
            <option>Select a Rank</option>
            <option>White Belt</option>
            <option>Blue Belt</option>
            <option>Purple Belt</option>
            <option>Brown Belt</option>
            <option>Black Belt</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Notfiy your instructor?</span>
            <input onChange={handleNotifyInstructorChange} type="checkbox" className="checkbox" />
          </label>

        </div>

        <div className="form-control">
          <label className="label">
            <span className="text-base label-text">Instructor address</span>
          </label>
          <div className="join">
            <QRCodeScanner uniqueID="add-form-scan" className="btn join-item" onScan={handleScan} />
            <input onChange={handleInstructorChange} value={instructorValue} className="input input-bordered join-item bg-white" />
          </div>
        </div>
        <div className=''>
          <button onClick={addMartialArtist} className="btn btn-accent">Add Martial Art</button>
        </div>
      </div>

    </div>
  );
}
export default AddForm;