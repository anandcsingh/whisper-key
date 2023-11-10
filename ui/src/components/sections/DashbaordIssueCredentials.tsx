import Authentication from '@/modules/Authentication';
import { useEffect, useState, useContext, Component, ChangeEvent } from "react";
import { AuthContext } from '@/components/layout/AuthPage';
import { CredentialMetadata, CredentialField } from '../../modules/CredentialMetadata';
import CredentialForm from './CredentialForm';
import QRCodeScanner from '../QRCodeScanner';

const DashBoardIssueCredentials = () => {
    const [selectedCredential, setSelectedCredential] = useState<CredentialMetadata | null>(null);
    const [credentialMetaDataList, setCredentialMetaDataList] = useState<CredentialMetadata[]>([]);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        const selectedCredentialObject = credentialMetaDataList.find(vc => vc.name === selectedValue);
        selectedCredentialObject!.issuer = Authentication.address;
        // Do something with the selectedCredentialObject, such as updating state
        setSelectedCredential(selectedCredentialObject || null);
    };

    useEffect(() => {
        // This will log the updated value after the state has been successfully updated
        console.log(selectedCredential?.name);
    }, [selectedCredential]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const credsApi: string = (process.env.NEXT_PUBLIC_CREDENTIALS_API_GET_ALL as string);
                console.log('credsAPi: ', credsApi)
                if(!credsApi){
                    throw new Error('API URL not defined in environment variables.');
                }          
                // const response = await fetch(credsApi);
                // const result = await response.json();

                // let creds : CredentialMetadata[] = result as CredentialMetadata[];
 let passport = {
        name: "Passport",
        owner: "3e42",
        fields:[
            {  description: "", name: "number", type: "CircuitString"},
            { description: "", name: "expiryDate", type: "CircuitString"},
            { description: "", name: "unique", type: "Field"},
            { description: "", name: "address", type: "PublicKey"},
            { description: "", name: "name", type: "CircuitString"}
        ]
    } as CredentialMetadata;

                setCredentialMetaDataList([passport]);
            } catch (error) {
                console.error('Error trying to fetch Credential Metadata', error);
            }
        }
        fetchData();
    }, []);

    return (

        <div>
            <a className="inline-block rounded btn-primary px-12 py-3 text-center text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400" href='#issue_credential_modal'>Issue Verifiable Credentials to Users</a>
            <div className='modals-area'>
                <dialog className="modal" id="issue_credential_modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <form method="dialog" className="modal-box w-11/12 max-w-5xl">
                            <div className="modal-action">
                                <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
                            </div>
                            <div>

      <h2 className='text-2xl font-bold sm:text-2xl'>Choose a Verifiable Credential</h2>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="text-base label-text vc-fieldName"></span>
                                    </label>
                                    <select className="select select-bordered w-full max-w-xs"
                                        onChange={handleSelectChange}>
                                            <option>Select a Credential</option>
                                        {credentialMetaDataList.map((vc, index) => (
                                            <option key={vc.name}>{vc.name}</option>
                                        ))};
                                    </select>
                                </div>
                                
                            </div>
                        </form>
                        <br />
                        <div className="modal-box w-11/12 max-w-5xl">
                            {selectedCredential !== null && (<CredentialForm credentialMetadata={selectedCredential}></CredentialForm>)}
                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </div>



    );
}

export default DashBoardIssueCredentials;
