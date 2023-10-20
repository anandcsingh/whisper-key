import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from "react";
import React from 'react';

const TestHeader = () => {
    return (

        <nav className="bg-gray-800">
            <header id="whisperNavHdr" className="fixed w-full">
                <nav className="border-gray-200 py-2.5 dark:bg-gray-900">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                    <a href="/" className="flex items-center">
                      {/* <img src="/assets/images/logo.png" className="h-6 mr-3 sm:h-9" alt="RankProok Logo" /> */}
                      <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Whisper Key</span>
                    </a>
                <div className="join">
                    {/* <Link href='#'>Issuers</Link>
                    <Link href='#'>Owners</Link>
                    <Link href='#'>Verifiers</Link> */}
                    <div className="navbar sm-base-100">
                      <a className="btn btn-ghost normal-case text-xl">Issuers</a>
                    </div>
                    <span className="navSeparator"></span>
                    <div className="navbar sm-base-100">
                      <a className="btn btn-ghost normal-case text-xl">Owners</a>
                    </div>
                    <span className="navSeparator"></span>
                    <div className="navbar sm-base-100">
                      <a className="btn btn-ghost normal-case text-xl">Verifiers</a>
                    </div>
               </div>
                <div className="flex items-center lg:order-2" id="mobile-menu-2">
                    <Link href='#'>Hello human</Link>
                    <Link href='#'>Account</Link>
                    
                    {/* <Link 
                    className="inline-block py-2 px-4 text-sm leading-5 text-green-50 btn-primary hover:bg-indigo-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md float-right"
                        href='#' >
                        Launch App
                    </Link> */}
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
    
    export default TestHeader;