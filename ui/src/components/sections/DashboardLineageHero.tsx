import { useContext } from "react";
import { AuthContext } from "../layout/AuthPage";
import DashboardCredentialsCreated from "./DashboardCredentialsCreated";
import DashBoardCredentialsOwnedGrid from "./DashboardCredentialsOwnedGrid";


const DashboardLineageHero = () => {
    const [authState, _]  = useContext(AuthContext);

    return (
        <div>
            <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
                <h2 className="text-3xl font-bold sm:text-4xl">
                    {authState.creator != null && 
                    <>
                    {authState.creator ? "Manage your credentials" : "View your credentials"}
                    </> }
                    </h2>
                <p className="mt-4 text-gray-600">
                   
                </p>

                <a className="mt-8 inline-block rounded btn-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                    href="#lineage_address_modal1">View Credentials</a>
            </div>

            <div className='modals-area'>
                <dialog className="modal" id="lineage_address_modal1">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <div className="modal-action">
                            <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
                        </div>
                          {authState.creator ? <DashboardCredentialsCreated /> : <DashBoardCredentialsOwnedGrid />}
                     
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>

        </div>
    );
}

export default DashboardLineageHero;