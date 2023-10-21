import QRCodeScanner from "@/components/QRCodeScanner";
import { AuthContext } from "@/components/layout/AuthPage";
import Authentication from "@/modules/Authentication";
import AllMaWorkerEventsClient from "@/modules/workers/AllMaWorkerEventsClient";
import Router from 'next/router';
import { useContext, useState } from "react";
import { PublicKey } from "snarkyjs";

const PromoteForm = () => {
    const [authState, setAuthState] = useContext(AuthContext);
    const [disciplineValue, setDisciplineValue] = useState('');
    const handleDiscipleineChange = async (event: any) => {
      setDisciplineValue(event.target.value);
    };
    const [rankValue, setRankValue] = useState('');
    const handleRankChange = async (event: any) => {
      setRankValue(event.target.value);
    };
    const [studentValue, setStudentValue] = useState('');
    const handleStudentChange = async (event: any) => {
        setStudentValue(event.target.value);
    };
    const [notifyStudentValue, setNotifyStudentValue] = useState('');
    const handleNotifyStudentChange = async (event: any) => {
      setNotifyStudentValue(event.target.value);
    };
    const handleScan = async (event: any) => {
        if (event) {
          console.log(event);
          setStudentValue(event);
        }
      }

      
  const promoteMartialArtist = async (event: any) => {
  
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Promoting Martial Artist, please wait this can take a few mins`, alertNeedsSpinner: true });
    Router.back();

    let instructorID = Authentication.address;
     let studentID = studentValue;
     let client = Authentication.zkClient! as AllMaWorkerEventsClient;
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Fetching contract for promotion, please wait this can take a few mins`, alertNeedsSpinner: true });
    console.log(`fetching account ${Authentication.contractAddress} @ ${new Date().toLocaleTimeString()}`);

     await client.fetchAccount({ publicKey: PublicKey.fromBase58(Authentication.contractAddress) });
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Invoking contracts for promotion, please wait this can take a few mins`, alertNeedsSpinner: true });

     console.log(`fetching account done ${Authentication.contractAddress} @ ${new Date().toLocaleTimeString()}`);

    let result = await client.promoteStudent(studentID, rankValue, instructorID, disciplineValue);
    console.log("result", result);
    if (result && result.success) {
      console.log("result", result);
      console.log("proving update transaction...");
      setAuthState({ ...authState, alertAvailable: true, alertMessage: `Proving transaction for promotion, please wait this can take a few mins`, alertNeedsSpinner: true });

      await client.proveUpdateTransaction();
      console.log("sending transaction...");
      setAuthState({ ...authState, alertAvailable: true, alertMessage: `Sending transaction for promotion, please approve the transaction on your wallet`, alertNeedsSpinner: true });

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
          setAuthState({ ...authState, alertAvailable: true, alertMessage: `Promote student transaction submitted ${hashlink}`, alertNeedsSpinner: false });
        }
        else {
          setAuthState({ ...authState, hasAlert: true, alertMessage: result.message, needsLoading: false });
        }
      }
      else {
        setAuthState({ ...authState, hasAlert: true, alertMessage: `Promote transaction failed, try again later`, needsLoading: false });
      }
    }
  }

  
    return (
        <div>
            <h2 className='text-3xl font-bold sm:text-4xl'>Promote your student</h2>
                  <div className='divider'></div>
                  <div className='grid grid-cols-1 space-y-6'>

                  <div className="form-control">
                      <label className="label">
                        <span className="text-base label-text">Student address</span>
                      </label>
                      <div className="join">
                      <QRCodeScanner uniqueID="promote-form-scan" className="btn join-item" onScan={handleScan} />
                      <input onChange={handleStudentChange} value={studentValue} className="input input-bordered join-item bg-white" />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="text-base label-text">Marital Art discipline</span>
                      </label>
                      <select  onChange={handleDiscipleineChange} className="select select-bordered w-full max-w-xs bg-white">
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
                      <select onChange={handleRankChange}  className="select select-bordered w-full max-w-xs bg-white">
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
                        <span className="label-text">Notfiy your student?</span>
                        <input onChange={handleNotifyStudentChange} type="checkbox" className="checkbox" />
                      </label>

                    </div>

                    
                    <div className=''>
                      <button onClick={promoteMartialArtist} className="btn btn-accent">Promote</button>
                    </div>
                  </div>

                </div>
    );
}
export default PromoteForm;