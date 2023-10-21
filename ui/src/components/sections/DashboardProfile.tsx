import Authentication from '@/modules/Authentication';
import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage';
import { UserMartialArts, UserMartialArt } from '@/modules/UserMartialArts';

interface DashboardProfileProps {
  // Define any props you want to pass to the component here
  disciplines: Array<UserMartialArt>;
}
const DashboardProfile: React.FC<DashboardProfileProps> = ({ disciplines }) => {

  const verifiedClass = "card w-96 bg-yellow-300 text-primary-content";
  const unVerifiedClass = "card w-96 bg-zinc-300 text-primary-content";
  const [verified, setverified] = useState("bg-blue-100");
  const [authState, _] = useContext(AuthContext);

  const shortName = () => {
      let address = authState.userAddress;
      return address.substring(0, 5) + "..." + address.substring(address.length - 5, address.length);
  }
  return (
    <div className="relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden">
      {/* Background illustration */}
      <div className="absolute right-0 top-0 -mt-4 mr-16 pointer-events-none hidden xl:block" aria-hidden="true">
        <svg width="319" height="198" xmlnsXlink="http://www.w3.org/1999/xlink">
          <defs>
            <path id="welcome-a" d="M64 0l64 128-64-20-64 20z" />
            <path id="welcome-e" d="M40 0l40 80-40-12.5L0 80z" />
            <path id="welcome-g" d="M40 0l40 80-40-12.5L0 80z" />
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="welcome-b">
              <stop stopColor="#A5B4FC" offset="0%" />
              <stop stopColor="#818CF8" offset="100%" />
            </linearGradient>
            <linearGradient x1="50%" y1="24.537%" x2="50%" y2="100%" id="welcome-c">
              <stop stopColor="#4338CA" offset="0%" />
              <stop stopColor="#6366F1" stopOpacity="0" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="none" fillRule="evenodd">
            <g transform="rotate(64 36.592 105.604)">
              <mask id="welcome-d" fill="#fff">
                <use xlinkHref="#welcome-a" />
              </mask>
              <use fill="url(#welcome-b)" xlinkHref="#welcome-a" />
              <path fill="url(#welcome-c)" mask="url(#welcome-d)" d="M64-24h80v152H64z" />
            </g>
            <g transform="rotate(-51 91.324 -105.372)">
              <mask id="welcome-f" fill="#fff">
                <use xlinkHref="#welcome-e" />
              </mask>
              <use fill="url(#welcome-b)" xlinkHref="#welcome-e" />
              <path fill="url(#welcome-c)" mask="url(#welcome-f)" d="M40.333-15.147h50v95h-50z" />
            </g>
            <g transform="rotate(44 61.546 392.623)">
              <mask id="welcome-h" fill="#fff">
                <use xlinkHref="#welcome-g" />
              </mask>
              <use fill="url(#welcome-b)" xlinkHref="#welcome-g" />
              <path fill="url(#welcome-c)" mask="url(#welcome-h)" d="M40.333-15.147h50v95h-50z" />
            </g>
          </g>
        </svg>
      </div>
      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold mb-1">
          Good afternoon, { authState.userAuthenticated && shortName() } 👋
        </h1>
        <p className="dark:text-indigo-200 pb-2">Start your martial arts journey today, Disciplines:</p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 items-center	">
          <div className='grid grid-cols-3'>
          {disciplines.map((discipline, index) => (

            <div key={index}>
              <a href="#my_modal_8">
                { !discipline.verified ? 
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-3 rounded dark:bg-blue-900 dark:text-blue-300">
                    {discipline.discipline} : {discipline.rank}
                  </div> : 
                  <div className="bg-yellow-300 text-blue-800 text-xs font-medium mr-2 px-2.5 py-3 rounded dark:bg-blue-900 dark:text-blue-300">{discipline.discipline} : {discipline.rank}</div>}
              </a>
              <div className="modal" id="my_modal_8">
                <div className="modal-box bg-white">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <p className="py-4">This modal works with anchor links</p>
                  <div className="modal-action">
                    <a href="#" className="btn btn-primary">Close</a>
                  </div>
                </div>
              </div>
            </div>



          ))}
          </div>
          <a className="inline-block rounded btn-primary px-12 py-3 text-center text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400" href='#add_action_modal'>ADD New Martial Art</a>
        </div>
      </div>
    </div>


  );
};

export default DashboardProfile;