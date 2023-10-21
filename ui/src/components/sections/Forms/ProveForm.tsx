import QRCodeScanner from "@/components/QRCodeScanner";
import { AuthContext } from "@/components/layout/AuthPage";
import Authentication from "@/modules/Authentication";
import AllMaWorkerClient from "@/modules/workers/AllMaWorkerClient";
import AllMaWorkerEventsClient from "@/modules/workers/AllMaWorkerEventsClient";
import Router from 'next/router';
import { useContext, useState } from "react";
import { PublicKey } from "snarkyjs";

const ProveForm = () => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [disciplineValue, setDisciplineValue] = useState('');
  const handleDiscipleineChange = async (event: any) => {
    setDisciplineValue(event.target.value);
  };

  const [inquirerValue, setInquirerValue] = useState('');
  const handleStudentChange = async (event: any) => {
    setInquirerValue(event.target.value);
  };
  const handleScan = async (event: any) => {
    if (event) {
      console.log(event);
      setInquirerValue(event);
    }
  }

  const proveMartialArtist = async (event: any) => {

    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Proving Martial Artist, please wait this can take a few mins`, alertNeedsSpinner: true });
    Router.back();
    let practitionerID = Authentication.address;
    let inquirerID = inquirerValue;

    let client = Authentication.zkClient! as AllMaWorkerEventsClient;
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Fetching account for prove rank, please wait this can take a few mins`, alertNeedsSpinner: true });
    console.log(`fetching account ${Authentication.contractAddress} @ ${new Date().toLocaleTimeString()}`);

    await client.fetchAccount({ publicKey: PublicKey.fromBase58(Authentication.contractAddress) });
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Invoking contracts for prove rank, please wait this can take a few mins`, alertNeedsSpinner: true });
    //console.log(`Proving martial art rank for ${practitionerID} to ${inquirerID} for discipline ${disciplineValue}`);
    console.log(`fetching account done ${Authentication.contractAddress} @ ${new Date().toLocaleTimeString()}`);

    await client.prove(practitionerID, inquirerID, disciplineValue);
    //await client.proveYourRank(inquirerID, "white", practitionerID, disciplineValue);
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Proving transaction fro prove rank, please wait this can take a few mins`, alertNeedsSpinner: true });

    await client.proveUpdateTransaction();
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Sending transaction for prove rank, please approve the transaction on your wallet`, alertNeedsSpinner: true });

    let hash = await client.sendTransaction();
    if (hash) {

      let hashStr = `https://berkeley.minaexplorer.com/transaction/${hash}`;
      let hashlink = `<a href="${hashStr}" class="btn btn-sm" target="_blank">View transaction</a>`;
      setAuthState({ ...authState, alertAvailable: true, alertMessage: `Prove martial art rank transaction submitted ${hashlink}`, alertNeedsSpinner: false });

    }
    else {
      setAuthState({ ...authState, hasAlert: true, alertMessage: `Prove martial art rank transaction failed, try again later`, needsLoading: false });
    }
  }


  return (
    <div>
      <h2 className='text-3xl font-bold sm:text-4xl'>Prove your rank</h2>
      <div className='divider'></div>
      <div className='grid grid-cols-1 space-y-6'>


        <div className="form-control">
          <label className="label">
            <span className="text-base label-text">Inquirer address</span>
          </label>
          <div className="join">
            <QRCodeScanner uniqueID="prove-form-scan" className="btn join-item" onScan={handleScan} />
            <input onChange={handleStudentChange} value={inquirerValue} className="input input-bordered join-item bg-white" />
          </div>
        </div>

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


        <div className=''>
          <button onClick={proveMartialArtist} className="btn btn-accent">Prove</button>
        </div>
      </div>

    </div>
  );
}
export default ProveForm;