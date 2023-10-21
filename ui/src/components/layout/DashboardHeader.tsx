import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useContext, useEffect, useState } from "react";
import React from 'react';
import Authentication from '@/modules/Authentication';
import { AuthContext } from './AuthPage';

const Header = () => {

  const [authState, setAuthState] = useContext(AuthContext);


  return (

    <nav className="bg-gray-800 z-100 invisible lg:visible">

      <header className="fixed w-full zclass">
        <nav className="border-gray-200 py-2.5 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">

            <a href="/" className="flex items-center">
              <img src="/assets/images/logo.png" className="h-6 mr-3 sm:h-9" alt="RankProok Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">RankProof</span>
            </a>


            <div className="flex items-center lg:order-2" id="mobile-menu-2">
              {/* <Link 
                className="inline-block py-2 px-4 text-sm leading-5 text-green-50 btn-primary hover:bg-indigo-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md float-right"
                 href='/dashboard' >
                    Launch App
                </Link> */}
              { authState.userAuthenticated && <p className='mr-2'>
                {authState.userAddress.substring(0, 5) + "..." + authState.userAddress.substring(authState.userAddress.length - 5, authState.userAddress.length)}
                </p> 
              }
              <button type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
  Notifications
  <span className="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
    2
  </span>
</button>
            </div>


          </div>
        </nav>
      </header>
    </nav>


  );
}

export default Header;