import QRCode from "react-qr-code";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage'
import { prop } from "snarkyjs";


const QRCodeCreator = (props) => {

  const [authState, _] = useContext(AuthContext);

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(authState.userAddress);
  };
  return (
    <div className="">
      <div className="grid grid-cols-1 text-center">
        <div className="m-auto">
          <h2 className="text-3xl font-bold sm:text-4xl">Share your address</h2>
          <p className="mt-4 text-gray-600">Allow others to scan your address or click the QR code to copy.</p>
        </div>
        <div className="m-auto py-7 ">

          <a onClick={copyAddressToClipboard} className="cursor-pointer">
            <QRCode
              value={authState.userAddress}
            />
          </a>
        </div>
        {/* <div className="alert alert-info m-auto" onClick={copyAddressToClipboard}>
          <span className="text-center">{authState.userAddress}</span>
          <svg class="h-5 w-5 fill-current text-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M 16 3 C 14.742188 3 13.847656 3.890625 13.40625 5 L 6 5 L 6 28 L 26 28 L 26 5 L 18.59375 5 C 18.152344 3.890625 17.257813 3 16 3 Z M 16 5 C 16.554688 5 17 5.445313 17 6 L 17 7 L 20 7 L 20 9 L 12 9 L 12 7 L 15 7 L 15 6 C 15 5.445313 15.445313 5 16 5 Z M 8 7 L 10 7 L 10 11 L 22 11 L 22 7 L 24 7 L 24 26 L 8 26 Z"></path></svg>
        </div> */}
      </div>
    </div>
  );
};

export default QRCodeCreator;