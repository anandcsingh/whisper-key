import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect, useState } from "react";
import React from 'react';
import Authentication from '@/modules/Authentication';
// import { AuthContext } from './AuthPage';
import { ProfileMetadata } from '@/modules/ProfileMetadata';
import { Inbox } from '@/modules/Inbox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EscrowWorkerClient from '@/modules/workers/EscrowWorkerClient';
import { Field, PublicKey } from 'o1js';
import { AuthContext } from 'zkshield';
import { SHA256 } from 'crypto-js';

let transactionFee = 0.1;

// [smartContractPubKey, Issuer]
type CredentialIssuer = [string, string];

const Header = () => {

  const [authState, setAuthState] = useContext(AuthContext);
  const [profileData, setProfileData] = useState<ProfileMetadata | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [preferredNotificationChannel, setPreferredNotificationChannel] = useState('');
  const [userPhone, setUserPhoneNum] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [inboxCount, setInboxCount] = useState(0);
  const [inboxNotiications, setInboxNotifications] = useState([]);
  const [formData, setFormData] = useState({});
  let [pendingPaymentData, setPendingPaymentData] = useState([]);
  var [credPaymentSelected, setCredPaymentSelected] = useState(false);
  var [credPaymentSelection, setCredPaymentSelection] = useState('');
  var [zkAppAddress, setzkAppAddress] = useState('');
  const [credentialIssuers, setCredentialIssuers] = useState<CredentialIssuer[]>([]);
  const [transactionlink, setTransactionLink] = useState('');
  const [currentEscrowCredential, setCurrentEscrowCredential] = useState('');
  const [loading, setLoading] = useState(false);


  const [state, setState] = useState({
    zkappWorkerClient: null as null | EscrowWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false
  });

  var inbox: Inbox = new Inbox();
  const fetchNotifications = async () => {

    try {
      console.log('Fetching inbox count...');
      let myWalletAddress = authState.userAuthenticated ? authState.userAddress : 'B62qqNZ5uRoJabpHubKLoaGQtHPiJBAoNWiPAHyf1W9iWHWzkko8pYC';
      if (myWalletAddress !== '' && myWalletAddress !== undefined && myWalletAddress !== null) {
        console.log('Fetching inbox count with wallet address');
        const inboxCount = await inbox.getInboxCount(myWalletAddress);
        setInboxCount(inboxCount);

        const inboxNotiications = await inbox.getNotifications(myWalletAddress);
        setInboxNotifications(inboxNotiications);
      }
    } catch (error) {
      console.error('Error fetching inbox count:', error);
    }
  };

  async function getPaymentsData(walletAddress: string, paymentStatus = "processing") {
    let apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/api/escrow?walletAddress=${walletAddress}&paymentStatus=${paymentStatus}`;
    const requestOptions = {
      method: "GET",
    };
    
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log('payments data', result);
        setPendingPaymentData(result);
      })
      .catch((error) => console.error('An error occurred while fetching pending payments data:', error));
  }

  const fetchPendingPayments = async () => {
    try {
      console.log('fetching pending payments');
      let myWalletAddress = authState.userAuthenticated ? authState.userAddress : '';
      if (myWalletAddress !== '' && myWalletAddress !== undefined && myWalletAddress !== null) {
        getPaymentsData(myWalletAddress);
      }

    } catch (error) {
      console.log('Error occurred while trying to fetch pending payments from dd...', error);
    }
  }

  const timeoutFn = (seconds: number) => {
    return new Promise(function (resolve: any) {
      setTimeout(function () {
        resolve();
      }, seconds * 1000);
    });
  }

  const findIssuer = (criteria: (tuple: CredentialIssuer) => boolean): CredentialIssuer | undefined => {
    return credentialIssuers.find(criteria);
  };

  const onSendTransaction = async () => {
    
    setAuthState({ ...authState, alertAvailable: true, alertMessage: `Compiling smart contract for escrow payment...`, alertNeedsSpinner: true });
    console.log('zkappaddress', zkAppAddress);
    console.log('Preparing to do a transaction');
    if(zkAppAddress) {
      console.log('Loading web worker...');
      const zkappWorkerClient = new EscrowWorkerClient();
      await timeoutFn(15);

      console.log('Done loading web worker');

      await zkappWorkerClient.setActiveInstanceToBerkeley();

      const mina = (window as any).mina;

      if (mina == null) {
        setState({ ...state, hasWallet: false });
        return;
      }

      const publicKeyBase58: string = (await mina.requestAccounts())[0];
      const publicKey = PublicKey.fromBase58(publicKeyBase58);

      console.log(`Using key:${publicKey.toBase58()}`);

      console.log('Checking if fee payer account exists...');

      const res = await zkappWorkerClient.fetchAccount({
        publicKey: publicKey!
      });
      const accountExists = res.error == null;

      await zkappWorkerClient.loadContract();

      console.log('Compiling zkApp...');
      await zkappWorkerClient.compileContract();
      console.log('zkApp compiled');

      const zkappPublicKey = PublicKey.fromBase58(zkAppAddress);

      //await zkappWorkerClient.initZkappInstance(zkappPublicKey, publicKeyBase58, "B62qozSM7ocHBxErDNimZprWf5Zcd4BNKizffvnDhBrjohhzRnkr3pC");
      let issuer = findIssuer(i => i[0] == zkAppAddress);

      if(issuer === null || issuer == undefined) {
        console.log(`Issuer value not found for Escrow Smart Contract... Resolve and try again ...`);
        return;
      }
      await zkappWorkerClient.initZkappInstance(zkappPublicKey, publicKeyBase58, issuer[0]);

      setState({
        ...state,
        zkappWorkerClient,
        hasWallet: true,
        hasBeenSetup: true,
        publicKey,
        zkappPublicKey,
        accountExists,
      });

      setState({ ...state, creatingTransaction: true });

      console.log('Creating a transaction...');

      await zkappWorkerClient!.fetchAccount({
        publicKey: publicKey!
      });
      
      setAuthState({ ...authState, alertAvailable: true, alertMessage: `About to accept your escrow payment...`, alertNeedsSpinner: true });

      console.log('Getting escrow sender...');
      let escrowSender = await zkappWorkerClient.getSender();
      console.log('Escrow sender: ', escrowSender)
      console.log('Getting escrow receiver...');
      let escrowReceiver = await zkappWorkerClient.getReceiver();
      console.log('Escrow receiver: ', escrowReceiver);

      if(escrowSender === null || escrowSender === undefined) {
        console.log('Setting escrow sender...');
        escrowSender = await zkappWorkerClient.setSender(publicKeyBase58, publicKeyBase58);
        console.log('Successfully set escrow sender...');
      }

      if(escrowReceiver === null || escrowReceiver === undefined) {
        console.log('Setting escrow receiver...');
        escrowReceiver = await zkappWorkerClient.setReciever(issuer[0], publicKeyBase58);
        console.log('Successfully set escrow receiver...');
      }
      
      console.log('About to start action to deposit to the smart contract');
      await zkappWorkerClient!.depositTransaction(publicKey.toBase58());
      console.log('Successfully deposited to smart contract');

      console.log('Creating proof...');
      await zkappWorkerClient!.proveUpdateTransaction();

      console.log('Requesting send transaction...');
      const transactionJSON = await zkappWorkerClient!.getTransactionJSON();

      console.log('Getting transaction JSON...');
      const { hash } = await (window as any).mina.sendTransaction({
        transaction: transactionJSON,
        feePayer: {
          fee: transactionFee,
          memo: ''
        }
      });

      const transactionLink = `https://berkeley.minaexplorer.com/transaction/${hash}`;
      setTransactionLink(transactionLink);
      setState({ ...state, creatingTransaction: false });

      console.log(`View transaction at ${transactionLink}`);

      let transactionLinkBtn = `<a href="${transactionLink}" class="btn btn-sm" target="_blank">View transaction</a>`;
      setAuthState({ ...authState, alertAvailable: true, alertMessage: `Successful escrow payment: ${transactionLinkBtn}... About to transfer funds to issuer!`, alertNeedsSpinner: false });
      
      //toast(`Successful escrow payment: ${transactionLinkBtn}`);

      await zkappWorkerClient.withdrawFromSmartContract(publicKeyBase58);

      console.log('Creating proof...');
      await zkappWorkerClient!.proveUpdateTransaction();

      console.log('Requesting send transaction for withdraw...');
      const transactionJsonWd = await zkappWorkerClient!.getTransactionJSON();

      console.log('Getting transaction JSON...');
      let hashWithdraw = await (window as any).mina.sendTransaction({
        transaction: transactionJSON,
        feePayer: {
          fee: transactionFee,
          memo: ''
        }
      });

      const transactionLinkWithdraw = `https://berkeley.minaexplorer.com/transaction/${hashWithdraw.hash}`;
      setTransactionLink(transactionLinkWithdraw);
      setState({ ...state, creatingTransaction: false });

      console.log(`View transaction at ${transactionLinkWithdraw}`);

      setAuthState({ ...authState, alertAvailable: true, alertMessage: `Successfully transferred funds to the issuer....`, alertNeedsSpinner: false });

      toast(`Successfully transferred funds to the issuer. You will be alerted in your inbox when your Credential has been issued!`);

      console.log('Successfully transferred Mina in escrow to the issuer. Next step is to issue the credential');

      // var events = await zkappWorkerClient.getEscrowEvents();
      
      // console.log('Events loaded in the UI ....');

      let escrowReceived = true;

      // //@ts-ignore
      // events!.map(async (e) => {
      //   let data = JSON.stringify(e.event);
      //   if(data === 'escrow-funds-received') {
      //     // Transfer from smart contract to Verifiable Credential Issuer
      //     await zkappWorkerClient.withdrawFromSmartContract(publicKey.toBase58());
      //     escrowReceived = true;
      //   }
      // })

     // #region - Issuing Credential for Owner
      let cred = {
        owner: publicKeyBase58, 
        issuer: issuer[0], 
        credentialType: credPaymentSelection
      };
      let credStr = JSON.stringify(cred);
      // #region new-signedresult
      const hashRes = SHA256(credStr).toString();
      const signResult = await (window as any).mina?.signMessage({ message: hashRes }).catch((err: any) => err);
      // #endregion

      if(escrowReceived) {
        // Complete credential issuing
        fetchData({
          name: currentEscrowCredential,
          cred: {
            owner: publicKeyBase58, 
            issuer: issuer[0], 
            credentialType: credPaymentSelection
          }
        });
      }

      // setAuthState({ ...authState, alertAvailable: true, alertMessage: `Your credential has been successfully issued! 🥳`, alertNeedsSpinner: false });

      // #endregion

      setLoading(false);
    }

  }

  const fetchData = (data: any) => {
    const apiUrl = `${process.env.NEXT_PUBLIC_CREDENTIALS_API}/issue?name=${data.name}`;
    if (!apiUrl) {
      throw new Error('API URL not defined in environment variables.');
    }
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // You can add other headers here if needed
      },
      body: JSON.stringify(data)
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

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        let myWalletAddress = authState.userAuthenticated ? authState.userAddress : 'B62qqNZ5uRoJabpHubKLoaGQtHPiJBAoNWiPAHyf1W9iWHWzkko8pYC';
        if (myWalletAddress !== '' && myWalletAddress !== undefined && myWalletAddress !== null) {
          const profileInstance = new ProfileMetadata(myWalletAddress, '', '', '');
          const data = await profileInstance.getProfileInfo();
          setProfileData(data);

          setUserPhoneNum(data.phoneNumber);
          setUserEmail(data.emailAddress);
          setPreferredNotificationChannel(data.preferredNotificationChannel);
        }
      } catch (error) {
        console.error('Error fetching profile information:', error);
      }
    };
    fetchProfileInfo();
    fetchPendingPayments();
    fetchNotifications();
  }, []);

  const handleContactMethodChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setPreferredNotificationChannel(e.target.value);
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserPhoneNum(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserEmail(e.target.value);
  };

  const clearNotifications = () => {
    inbox.setNotifcationsAsSeen(authState.userAddress, inboxNotiications.map((notification: any) => notification.id));
    fetchNotifications();
  };

  const handleButtonClick = () => {
    console.log('clicked');
    if (preferredNotificationChannel) {
      console.log('Selected Contact Method:', preferredNotificationChannel);
    }
    let myWalletAddress = authState.userAuthenticated ? authState.userAddress : '';
    if (myWalletAddress !== '' && myWalletAddress !== undefined && myWalletAddress !== null) {
      console.log(`${myWalletAddress}, ${userPhone}, ${userEmail}, ${preferredNotificationChannel}`)
      const profile = new ProfileMetadata(myWalletAddress, userPhone, userEmail, preferredNotificationChannel);
      profile.updateProfileInfo();
    }
    setIsProfileModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if(e.target.name === "credentialName") {
      setCurrentEscrowCredential(e.target.value);
    }
  };

  function handleEscrowPayment(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log('Escrow payment initiated');
    const paymentConfirmModal = document.getElementById('payment_confirm');
    if (paymentConfirmModal !== null) {
      //@ts-ignore
        paymentConfirmModal.showModal();
    }
  }

  const handleDialogConfirm = (): void => {
    const escrowPayModal = document.getElementById('escrow_pay_modal');
    if (escrowPayModal !== null) {
      //@ts-ignore
      escrowPayModal.close();
    }
    console.log('Form submitted:', formData);
    setFormData({ address: '', credentialName: '', amount: '' });
    toast('🦄 Payment request received and will be processed. Wait for popup confirmation, then you will receive a notification in your inbox when credential is ready!');
  };


  return (

    <nav className="bg-gray-800 z-100 invisible lg:visible">

      <header className="fixed w-full zclass">
        <nav style={{backgroundColor:'#ccdbfe'}} className="border-gray-200 py-2.5 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">

            <a href="/" className="flex items-center">
              <img style={{borderRadius:'17px'}} src="/assets/images/logo.png" className="h-6 mr-3 sm:h-9" alt="RankProok Logo" />
              <span style={{color:'black'}} className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Whisper Key</span>
            </a>


            <div className="flex items-center lg:order-2" id="mobile-menu-2">
              {/* <Link 
                className="inline-block py-2 px-4 text-sm leading-5 text-green-50 btn-primary hover:bg-indigo-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md float-right"
                 href='/dashboard' >
                    Launch App
                </Link> */}
              {authState.userAuthenticated && <p style={{color:'black'}} className='mr-2'>
                {authState.userAddress.substring(0, 5) + "..." + authState.userAddress.substring(authState.userAddress.length - 5, authState.userAddress.length)}
              </p>
              }
            <div>
              { loading && <span className="loading loading-spinner loading-lg"></span>
 }
            </div>
            <button type='button' style={{ marginRight: '5px' }} onClick={()=>{
                  const escrowPayModal = document.getElementById('escrow_pay_modal');
                  if (escrowPayModal !== null) {
                    //@ts-ignore
                    escrowPayModal.showModal();
                  }
            }} className="button-channel inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Make Payment</button>
                <dialog id="escrow_pay_modal" className="modal">
                  <div className="modal-box">
                    <h2>Double click a Credential to make an escrow payment for (If any exists)</h2>
                    <li>
                      {pendingPaymentData.map((item : any) => (
                        <button className='btn btn-neutral' key={item.id} onClick={() => {
                          setCredPaymentSelected(!credPaymentSelected);
                          setCredPaymentSelection(item.credential.credentialType);
                          setzkAppAddress(item.smartContractPublicKey);
                          var issuer: CredentialIssuer;
                          issuer = [item.smartContractPublicKey, item.credential.issuer];
                          setCredentialIssuers([...credentialIssuers, issuer]);
                          console.log('Cred payment selected:', credPaymentSelected);
                          console.log('Cred type:', credPaymentSelection)
                          console.log('zkApp Address:', zkAppAddress);
                          // const escrowTitle = document.getElementById('payment-title');
                          // if(escrowTitle !== null){
                          //   escrowTitle.innerText = `Escrow Payment: ${item.credential.credentialType} 🪙`;
                          // }
                        }}>{item.credential.credentialType}</button>
                      ))}
                    </li>
                    <h3 id="payment-title" className="font-bold text-lg">Escrow Payment: {credPaymentSelection} 🪙</h3>
                    <p className="py-4">Press ESC key to close</p>
                    <div className="modal-action">
                      <form method='submit' onSubmit={handleEscrowPayment}>
                        {/* if there is a button in form, it will close the modal */}
                        <div>
                          <input style={{marginTop: "10px"}} name="address" type="text" placeholder="Wallet address" onChange={handleChange} className="input input-bordered input-info w-full max-w-xs" />
                          <input value={credPaymentSelection} style={{marginTop: "10px"}} name="credentialName" type="text" placeholder="Credential Name" className="input input-bordered input-info w-full max-w-xs" />
                          {/* <input style={{marginTop: "10px"}} name="amount" type="text" placeholder="Amount in Mina" onChange={handleChange} className="input input-bordered input-info w-full max-w-xs" /> */}
                        </div>
                        <button style={{marginTop: "20px"}} onClick={() => {console.log('modal closed')}} className="btn">Pay</button>
                      </form>
                    </div>
                  </div>
                </dialog>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="payment_confirm" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Great!</h3>
                  <p className="py-4">Are you sure you want to pay?</p>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn" onClick={async () => {
                        handleDialogConfirm();
                        //setLoading(true);
                        await onSendTransaction();
                        //setLoading(false);
                      }} >Yes</button>
                      <button style={{marginLeft: "5px"}} className='btn' onClick={async () => {
                            const paymentConfirmModal = document.getElementById('payment_confirm');
                            if (paymentConfirmModal !== null) {
                              //@ts-ignore
                                paymentConfirmModal.close();
                            }
                            setCredPaymentSelection("");
                      }} >No</button>
                    </form>
                  </div>
                </div>
              </dialog>
              <ToastContainer autoClose={17000} />

              <a href="#inbox_modal" type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Inbox
                {inboxCount > 0 && <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                  {inboxCount}
                </span>
                }
              </a>
              <button type="button" style={{ marginLeft: '5px' }} onClick={() => setIsProfileModalOpen(true)}
                className="button-channel inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Profile
              </button>

              {isProfileModalOpen && (
                <div style={{ display: 'flex', flexDirection: 'column' }} className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-80">
                  <div style={{ display: 'flex' }}>
                    <h1 style={{ color: 'white', fontSize: '30px' }}>User Settings</h1>
                    {/* Close button */}
                    <button
                      className="text-white"
                      onClick={() => setIsProfileModalOpen(false)}
                      style={{ fontSize: '24px', cursor: 'pointer', marginLeft: '15px' }}
                    >
                      &times;
                    </button>
                  </div> <br />
                  {/* Dropdown Menu */}
                  <div className="mt-4" style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '20px', color: 'white' }} htmlFor="contactMethod">
                      Notification Method
                    </label>
                    <select
                      id="contactMethod"
                      name="contactMethod"
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      onChange={handleContactMethodChange}
                      value={preferredNotificationChannel}
                    >
                      <option value="">Select Contact Method</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="sms">SMS</option>
                      <option value="email">Email</option>
                    </select>
                    <label htmlFor="mobile" style={{ fontSize: '20px', color: 'white' }}>
                      Mobile Number
                    </label>
                    <input onChange={handleMobileChange} id='mobile' value={userPhone} type="text" className="mt-1 block w-full p-2 border border-gray-300 
                  rounded-md bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    <label htmlFor="email" style={{ fontSize: '20px', color: 'white' }}>
                      Email
                    </label>
                    <input onChange={handleEmailChange}
                    id='email' value={userEmail} type="text" className="mt-1 block w-full p-2 border border-gray-300 
                  rounded-md bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    {/* Button to capture choice */}
                    <button
                      className="mt-4 bg-purple-500 text-white px-4 py-2 rounded"
                      onClick={handleButtonClick}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}

              <div>
                <div className='modals-area'>
                  <dialog className="modal" id="inbox_modal">
                    <div className="modal-box w-11/12 max-w-5xl">
                      <div className="modal-action">
                        <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
                      </div>
                      <h2 className="text-2xl font-bold sm:text-2xl">Inbox
                      </h2>
                      <button onClick={clearNotifications} className="btn btn-xs">Clear</button>
                      <div>
                        <div className="overflow-x-auto">
                          <table className="table">
                            {/* head */}
                            <thead>
                              <tr>
                                <th></th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {inboxNotiications.length === 0 && <tr>
                                <th colSpan={2} className='text-center'>No notifications available</th>
                              </tr>}
                              {/* row 1 */}
                              {inboxNotiications.map((notification: any, index: number) => (
                                <tr key={index}>
                                  <th>{index + 1}</th>
                                  <td>
                                    {notification.type === 'created' &&
                                      `Credential ${notification.credentialName} has been created.`}
                                    {notification.type === 'issued' &&
                                      `Credential ${notification.credentialName} has been issued to you`}
                                    {notification.type === 'escrow' &&
                                      `Credential ${notification.credentialName} is ready for your escrow payment of 10 Mina`}
                                  </td>
                                </tr>
                              ))}

                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
              </div>

            </div>


          </div>
        </nav>
      </header>
    </nav>


  );
}

export default Header;
