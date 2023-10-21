import { useState } from "react";
import { DashboardActionsProps } from "./DashboardActions";
import React from "react";
import Authentication from "@/modules/Authentication";
import QRCodeCreator from "@/components/QRCodeCreator";

const InstructorsAction: React.FC<DashboardActionsProps> = ({ isInstructor }) => {

  const [address, setAddress] = useState('');
  const [showAddress, setShowAddress] = useState(false);
  const showAddressModalRef = React.useRef<HTMLDivElement>(null);
  const showAddressModal = async () => {
    let tempAddress = Authentication.address ? Authentication.address : 'No address loaded';// Authentication.address;
    setAddress(tempAddress);
    setShowAddress(true);
    try {
      (window as any).share_address_modal.showModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <a
        className="cursor-pointer block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
        href="#share_address_modal"
      >

        <span className="inline-block rounded-lg bg-gray-50 p-3">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#652dc5" viewBox="0 0 16 20">
            <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
        </span>

        <h2 className="mt-2 font-bold">My Address</h2>

        <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
          View or share my MINA address.
        </p>
      </a>

      <div className='modals-area'>
        <dialog className="modal" id="share_address_modal">
          <form method="dialog" className="modal-box bg-white">
            <div className="modal-action">
              <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
            </div>
            <QRCodeCreator address={address} />
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>




      {/* <dialog className="modal" id="share_address_modal">
                    <form method="dialog" className="modal-box bg-white w-1/2 max-w-5xl">

                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      {showAddress && <QRCodeCreator address={address} />}

                    </form>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog> */}
    </div>
  );
}
export default InstructorsAction;