import QRCodeScanner from "@/components/QRCodeScanner";
import { AuthContext } from "@/components/layout/AuthPage";
import Authentication from "@/modules/Authentication";
import AllMaWorkerClient from "@/modules/workers/AllMaWorkerClient";
import AllMaWorkerEventsClient from "@/modules/workers/AllMaWorkerEventsClient";
import Router from 'next/router';
import { useContext, useState } from "react";
import { PublicKey } from "o1js";

const PromoteForm = () => {
    const [authState, setAuthState] = useContext(AuthContext);
    const [disciplineValue, setDisciplineValue] = useState('');
    const handleDiscipleineChange = async (event: any) => {
      setDisciplineValue(event.target.value);
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
  
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Revoking a Martial Artist, please wait this can take a few mins`, alertNeedsSpinner: true });
    Router.back();

    let instructorID = Authentication.address;
     let studentID = studentValue;
     console.log("studentID", studentID);
     let client = Authentication.zkClient! as AllMaWorkerEventsClient;
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Fetching account for revoke student, please wait this can take a few mins`, alertNeedsSpinner: true });

     await client.fetchAccount({ publicKey: PublicKey.fromBase58(Authentication.contractAddress) });
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Invoking contracts fro revoke student, please wait this can take a few mins`, alertNeedsSpinner: true });

    let result = await client.revokeStudent(studentID, instructorID, disciplineValue);
    console.log("result", result);
    if (result && result.success) {
      console.log("result", result);
      console.log("proving update transaction...");
      setAuthState({ ...authState, alertAvailable: true, alertMessage: `Proving transaction for revoke student, please wait this can take a few mins`, alertNeedsSpinner: true });

      await client.proveUpdateTransaction();
      console.log("sending transaction...");
      setAuthState({ ...authState, alertAvailable: true, alertMessage: `Sending transaction for revoke student, please approve the transaction on your wallet`, alertNeedsSpinner: true });

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
          setAuthState({ ...authState, alertAvailable: true, alertMessage: `Revoke martial artist transaction submitted ${hashlink}`, alertNeedsSpinner: false });
        }
        else {
          setAuthState({ ...authState, hasAlert: true, alertMessage: result.message, needsLoading: false });
        }
      }
      else {
        setAuthState({ ...authState, hasAlert: true, alertMessage: `Revoke martial artist transaction failed, try again later`, needsLoading: false });
      }
    }
  }

  
    return (
        <div>
            <h2 className='text-3xl font-bold sm:text-4xl'>Revoke your student's rank</h2>
                  <div className='divider'></div>
                  <div className='grid grid-cols-1 space-y-6'>

                  <div className="form-control">
                      <label className="label">
                        <span className="text-base label-text">Student address</span>
                      </label>
                      <div className="join">
                      <QRCodeScanner uniqueID="revoke-form-scan" className="btn join-item" onScan={handleScan} />
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
                      <label className="label cursor-pointer">
                        <span className="label-text">Notfiy your student?</span>
                        <input onChange={handleNotifyStudentChange} type="checkbox" className="checkbox" />
                      </label>

                    </div>

                    
                    <div className=''>
                      <button onClick={promoteMartialArtist} className="btn btn-accent">Revoke</button>
                    </div>
                  </div>

                </div>
    );
}
export default PromoteForm;