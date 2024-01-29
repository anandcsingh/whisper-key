import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect, useState } from "react";
import React from 'react';
import Authentication from '@/modules/Authentication';
import { AuthContext } from './AuthPage';
import { ProfileMetadata } from '@/modules/ProfileMetadata';
import { Inbox } from '@/modules/Inbox';

const Header = () => {

  const [authState, setAuthState] = useContext(AuthContext);
  const [profileData, setProfileData] = useState<ProfileMetadata | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [preferredNotificationChannel, setPreferredNotificationChannel] = useState('');
  const [userPhone, setUserPhoneNum] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [inboxCount, setInboxCount] = useState(0);
  const [inboxNotiications, setInboxNotifications] = useState([]);
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

    
    fetchNotifications();
  }, []);

  const handleContactMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferredNotificationChannel(event.target.value);
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
      const profile = new ProfileMetadata(myWalletAddress, userPhone, userEmail, preferredNotificationChannel);
      profile.updateProfileInfo();
    }
    setIsProfileModalOpen(false);
  };


  return (

    <nav className="bg-gray-800 z-100 invisible lg:visible">

      <header className="fixed w-full zclass">
        <nav className="border-gray-200 py-2.5 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">

            <a href="/" className="flex items-center">
              <img src="/assets/images/logo.png" className="h-6 mr-3 sm:h-9" alt="RankProok Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Whisper Key</span>
            </a>


            <div className="flex items-center lg:order-2" id="mobile-menu-2">
              {/* <Link 
                className="inline-block py-2 px-4 text-sm leading-5 text-green-50 btn-primary hover:bg-indigo-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md float-right"
                 href='/dashboard' >
                    Launch App
                </Link> */}
              {authState.userAuthenticated && <p className='mr-2'>
                {authState.userAddress.substring(0, 5) + "..." + authState.userAddress.substring(authState.userAddress.length - 5, authState.userAddress.length)}
              </p>
              }
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
                    <input id='mobile' value={userPhone} type="text" className="mt-1 block w-full p-2 border border-gray-300 
                  rounded-md bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
                    <label htmlFor="email" style={{ fontSize: '20px', color: 'white' }}>
                      Email
                    </label>
                    <input id='email' value={userEmail} type="text" className="mt-1 block w-full p-2 border border-gray-300 
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