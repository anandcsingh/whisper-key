import Add from "@/pages/add.page";
import { DashboardActionsProps } from "./DashboardActions";
import PromoteForm from "../Forms/PromoteForm";

const PromoteAction: React.FC<DashboardActionsProps> = ({ isInstructor }) => {

    return (
        <>
            {isInstructor &&
                <div>
                    <a
                        className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                        href="#promote_modal"
                    >
                        <span className="inline-block rounded-lg bg-gray-50 p-3">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="#652dc5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.008 8.714c1-.097 1.96-.45 2.792-1.028a25.112 25.112 0 0 0 4.454-5.72 1.8 1.8 0 0 1 .654-.706 1.742 1.742 0 0 1 1.65-.098 1.82 1.82 0 0 1 .97 1.128c.075.248.097.51.065.767l-1.562 4.629M4.008 8.714H1v9.257c0 .273.106.535.294.728a.99.99 0 0 0 .709.301h1.002a.99.99 0 0 0 .71-.301c.187-.193.293-.455.293-.728V8.714Zm8.02-1.028h4.968c.322 0 .64.08.925.232.286.153.531.374.716.645a2.108 2.108 0 0 1 .242 1.883l-2.36 7.2c-.288.813-.48 1.354-1.884 1.354-2.59 0-5.39-1.06-7.504-1.66"/>
                        </svg>
                        </span>

                        <h2 className="mt-2 font-bold">Promote</h2>

                        <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                            Promote my students across disciplines.
                        </p>
                    </a>

                    <div className='modals-area'>
                        <dialog className="modal" id="promote_modal">
                            <form method="dialog" className="modal-box bg-white">
                                <div className="modal-action">
                                    <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
                                </div>
                                <PromoteForm />

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
export default PromoteAction;