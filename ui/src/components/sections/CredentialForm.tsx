import React, { ChangeEvent, FormEvent, Component, useContext, useState } from 'react';
import { CredentialMetadata, CredentialField } from '../../modules/CredentialMetadata';

import QRCodeScanner from '../QRCodeScanner';
import Authentication from '@/modules/Authentication';
import { AuthContext } from "@/components/layout/AuthPage";
import Router from 'next/router';
import { SHA256 } from 'crypto-js';
import { Field, Signature, Scalar, PublicKey } from 'o1js';
import { ContractDeployer } from '../../../../whisper-key-core/src/ContractDeployer';


interface CredentialFormProps {
  credentialMetadata: CredentialMetadata;
}

const CredentialForm: React.FC<CredentialFormProps> = ({ credentialMetadata }) => {
  const { fields } = credentialMetadata;
  const [authState, setAuthState] = useContext(AuthContext) as any;
  const [state, setState] = useState({
    formData: {} as any,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    state.formData.issuer = Authentication.address; // the credential owner is issuing the credential
    state.formData.credentialType = credentialMetadata.name;
    // Process the form data, you can access it from this.state.formData
    console.log('Form Data:', state.formData);
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Issuing Verifiable Credential, please wait this can take a few mins`, alertNeedsSpinner: true });
    Router.back();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const credStr = JSON.stringify(state.formData);
    const hash = SHA256(credStr).toString();
    //const hash = '1216d101a5016fbbcb8c0df2896be04517197aea2f92a4f5fdd117a6633795ae';
    const signResult = await (window as any).mina?.signMessage({ message: hash }).catch((err: any) => err);
    // const signature = new Signature(Field(signResult.signature.field), Scalar.fromBigInt(BigInt(signResult.signature.scalar)));
    // const baseSig = signature.toBase58();
    // console.log("base58", baseSig);
    var escrowAmt = 10;
    var paymentStatus = "processing";

    var ownerWalletAddress = state.formData.owner;

    fetchData({ data: state.formData, hash: hash, signResult: signResult });
    
    //storeEscrowData({ data: state.formData, hash: hash, signResult: signResult }, {paymentAmount: escrowAmt, paymentStatus: paymentStatus}, ownerWalletAddress);
  };

  const storeEscrowData = async(formData: any, escrowData: any, ownerWalletAddress: string) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/api/escrow/data}`;
    if (!apiUrl) {
      throw new Error('API URL not defined in environment variables.');
    }
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // You can add other headers here if needed
      },
      body: JSON.stringify({
        walletAddress: ownerWalletAddress,
        payment: escrowData,
        paymentReqs: formData 
      })
    };
    try {

    const response = fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
          console.log(data);
        })
    .catch((err: any) => console.error('Error trying to fetch Escrow store data response', err));
    } catch (error) {
      console.error('Error trying to store Escrow Data', error);
    }
  }

  const fetchData = (formData: any) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/issue/${credentialMetadata.name}`;
    if (!apiUrl) {
      throw new Error('API URL not defined in environment variables.');
    }
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // You can add other headers here if needed
      },
      body: JSON.stringify(formData)
    };
    try {

    const response = fetch(apiUrl, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
          let transactionLink = `<a href="${data.transactionUrl}" class="btn btn-sm" target="_blank">View transaction</a>`;
           setAuthState({ ...authState, alertAvailable: true, alertMessage: `Credential issued ${transactionLink}`, alertNeedsSpinner: false });
        })
    .catch((err: any) => console.error('Error trying to fetch Credential Metadata', err));
    } catch (error) {
      console.error('Error trying to fetch Credential Metadata', error);
    }
  }

  // const renderFormField = (field: CredentialField) => {
  //   const { name } = field;
  //   return (
  //     <div key={name} className="form-control">
  //       <label className="label">
  //         <span className="text-base label-text">{name}</span>
  //       </label>
  //       <input type="text" id={name} name={name} onChange={handleInputChange} className="input input-bordered w-full max-w-xs" placeholder={"Enter " + name} />
  //     </div>
  //   );
  // }

  const renderFormField = (field: CredentialField) => {
    const {name, type} = field;

    let inputElement;
    switch(type){
      case 'PublicKey':
        inputElement = (
          <div className="join">
            <QRCodeScanner uniqueID="promote-form-scan" className="btn join-item" />
            <input id='owner' name="owner" onChange={handleInputChange} className="input input-bordered join-item " />
          </div>
        );
        break;
        case 'CircuitString':
          inputElement = (
            <input
              type="text"
              id={name}
              name={name}
              onChange={handleInputChange}
              className="input input-bordered w-full max-w-xs"
              placeholder={"Enter " + name}
            />
          );
          break;
        case 'Field':
          inputElement = (
            <input
              type="number"
              id={name}
              name={name}
              onChange={handleInputChange}
              className="input input-bordered w-full max-w-xs"
              placeholder={"Enter " + name}
            />
          );
          break;
        case 'Bool':
          inputElement = (
            <input
              type="checkbox"
              id={name}
              name={name}
              onChange={handleInputChange}
              className="input-checkbox"
            />
          );
          break;
        default:
          inputElement = (
            <input
              type="text"
              id={name}
              name={name}
              onChange={handleInputChange}
              className="input input-bordered w-full max-w-xs"
              placeholder={"Enter " + name}
            />
          );
          break;
    }

    return (
      <div key={name} className="form-control">
        <label className="label">
          <span className="text-base label-text">{name} (Type: {type})</span>
        </label>
        {inputElement}
      </div>
    );
  };


  return (
    <div className='grid grid-cols-1 space-y-6'>
      <h2 className='text-2xl font-bold sm:text-2xl'>Verifiable Credential Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="text-base label-text">Owner</span>
          </label>
          <div className="join">
            <QRCodeScanner uniqueID="promote-form-scan" className="btn join-item" />
            <input id='owner' name="owner" onChange={handleInputChange} className="input input-bordered join-item " />
          </div>
          {/* <input type="text" id="name" className="input input-bordered w-full max-w-xs" placeholder="Enter the address of the intended owner" /> */}
        </div>
        {fields.map((field) => renderFormField(field))}
        <div className='mt-6'>
          <button type='submit' className="btn btn-primary">Issue</button>
        </div>
      </form>
    </div>
  );
}




// interface CredentialFormState {
//   formData: Record<string, string>;
// }

// class CredentialForm extends Component<CredentialFormProps, CredentialFormState> {
//   authState:any;
//   setAuthState:any;
//   constructor(props: CredentialFormProps) {
//     super(props);
//     this.state = {
//       formData: {},
//     };

//   }

//   handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     this.setState((prevState) => ({
//       formData: {
//         ...prevState.formData,
//         [name]: value,
//       },
//     }));
//   };

//   handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     this.state.formData.issuer = Authentication.address; // the credential owner is issuing the credential
//     // Process the form data, you can access it from this.state.formData
//     console.log('Form Data:', this.state.formData);
//     // TODO: Smooze method goes here
//     this.setAuthState({ ...this.authState, alertAvailable: true, alertMessage: `Adding Verifiable Credential, please wait this can take a few mins`, alertNeedsSpinner: true });
//     Router.back();
//     window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
//     Authentication.zkClient.issueCredential(this.state.formData, this.props.credentialMetadata);

//   };

//   renderFormField(field: CredentialField) {
//     const { name } = field;
//     return (
//       <div key={name} className="form-control">
//       <label className="label">
//         <span className="text-base label-text">{name}</span>
//       </label>
//       <input type="text" id={name} name={name} onChange={this.handleInputChange} className="input input-bordered w-full max-w-xs" placeholder={"Enter " + name} />
//     </div>
//     );
//   }

//   render() {
//     const { fields } = this.props.credentialMetadata;
//     [this.authState, this.setAuthState] = useContext(AuthContext) as any;

//     return (
//       <div className='grid grid-cols-1 space-y-6'>
//       <h2 className='text-2xl font-bold sm:text-2xl'>Verifiable Credential Details</h2>
//       <form onSubmit={this.handleSubmit}>
//       <div className="form-control">
//                                     <label className="label">
//                                         <span className="text-base label-text">Owner</span>
//                                     </label>
//                                     <div className="join">
//                                     <QRCodeScanner uniqueID="promote-form-scan" className="btn join-item" />
//                                     <input id='owner' name="owner" onChange={this.handleInputChange} className="input input-bordered join-item " />
//                                     </div>
//                                     {/* <input type="text" id="name" className="input input-bordered w-full max-w-xs" placeholder="Enter the address of the intended owner" /> */}
//                                 </div>
//       {fields.map((field) => this.renderFormField(field))}
//       <div className='mt-6'>
//           <button type='submit' className="btn btn-primary">Issue</button>
//         </div>
//         </form>
//         </div>
//     );
//   }
// }

export default CredentialForm;
