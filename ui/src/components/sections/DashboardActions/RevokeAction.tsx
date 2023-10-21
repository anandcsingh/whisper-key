import Add from "@/pages/add.page";
import { DashboardActionsProps } from "./DashboardActions";
import RevokeForm from "../Forms/RevokeForm";

const RevokeAction: React.FC<DashboardActionsProps> = ({ isInstructor }) => {

    return (
        <>
            {isInstructor &&
                <div>
                    <a
                        className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                        href="#revoke_modal"
                    >
                        <span className="inline-block rounded-lg bg-gray-50 p-3">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="#652dc5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.992 11.287c-1 .097-1.96.45-2.792 1.029a25.118 25.118 0 0 0-4.454 5.721 1.803 1.803 0 0 1-.655.705 1.742 1.742 0 0 1-1.648.096 1.786 1.786 0 0 1-.604-.457 1.874 1.874 0 0 1-.432-1.439l1.562-4.626m9.023-1.03H19V2.03c0-.273-.106-.535-.294-.728A.99.99 0 0 0 17.997 1h-1.002a.99.99 0 0 0-.71.301 1.042 1.042 0 0 0-.293.728v9.258Zm-8.02 1.03H3.003c-.322 0-.64-.08-.925-.233a2.022 2.022 0 0 1-.716-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.2C3.769 1.54 3.96 1 5.365 1c2.59 0 5.39 1.06 7.504 1.66"/>
                            </svg>
                        </span>

                        <h2 className="mt-2 font-bold">Revoke</h2>

                        <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                            Revoke an existing student's rank.
                        </p>
                    </a>

                    <div className='modals-area'>
                        <dialog className="modal" id="revoke_modal">
                        <form method="dialog" className="modal-box bg-white">
                                <div className="modal-action">
                                    <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
                                </div>
                                <RevokeForm />

                            </form>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>

                </div>
            }
        </>
    );
}
export default RevokeAction;