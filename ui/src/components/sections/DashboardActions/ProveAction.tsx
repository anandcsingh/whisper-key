import Add from "@/pages/add.page";
import { DashboardActionsProps } from "./DashboardActions";
import ProveForm from "../Forms/ProveForm";

const ProveAction: React.FC<DashboardActionsProps> = ({ isInstructor }) => {

    return (
        <div>
            <a
                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href="#prove_modal"
            >
                <span className="inline-block rounded-lg bg-gray-50 p-3">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="#652dc5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.656 12.115a3 3 0 0 1 5.682-.015M13 5h3m-3 3h3m-3 3h3M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm6.5 4.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                    </svg>
                </span>

                <h2 className="mt-2 font-bold">Prove</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                    Prove my rank to another practitioner.
                </p>
            </a>

            <div className='modals-area'>
                <dialog className="modal" id="prove_modal">
                <form method="dialog" className="modal-box bg-white">
                        <div className="modal-action">
                            <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
                        </div>
                        <ProveForm />

                    </form>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>

        </div>
    );
}
export default ProveAction;