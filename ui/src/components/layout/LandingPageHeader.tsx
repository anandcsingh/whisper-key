import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from "react";
import React from 'react';
import Authentication from '@/modules/Authentication';

const Header = () => {
 
  return (

    <nav className="bg-gray-800">

      <header className="fixed w-full">
        <nav className="bg-white border-gray-200 py-2.5 dark:bg-gray-900">
          <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">

            <a href="/" className="flex items-center">
              <img src="/assets/images/logo.png" className="h-6 mr-3 sm:h-9" alt="RankProok Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">RankProof</span>
            </a>
           
            
              <div className="flex items-center lg:order-2" id="mobile-menu-2">
                <Link 
                className="inline-block py-2 px-4 text-sm leading-5 text-green-50 btn-primary hover:bg-indigo-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md float-right"
                 href='/dashboard' >
                    Launch App
                </Link>
                {/* <Link 
                className="inline-block py-2 px-4 text-sm leading-5 text-green-50 btn-primary hover:bg-indigo-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md float-right"
                 href='/manage' >
                    Manage App
                </Link> */}
                
              </div>
            

          </div>
        </nav>
      </header>
    </nav>


  );
}

export default Header;