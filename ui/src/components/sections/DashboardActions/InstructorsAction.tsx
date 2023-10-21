import InstructorsDen from "@/pages/instructorsden.page";
import { DashboardActionsProps } from "./DashboardActions";
import InstructorMartialArts from "../InstructorMartialArts";

const InstructorsAction: React.FC<DashboardActionsProps> = ({ isInstructor, disciplines }) => {

    return (
        <>
            {isInstructor &&
                <div>
                    <a className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                        href="#instructors_action_modal">

                        <span className="inline-block rounded-lg bg-gray-50 p-3">
                            {/* <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#652dc5" viewBox="0 0 14 18">
                                <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                            </svg>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#652dc5" viewBox="0 0 14 18">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
</svg> */}
<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#652dc5" viewBox="0 0 20 16">
                               <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"/>
    <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z"/>
  </svg>
                        </span>

                        <h2 className="mt-2 font-bold">My Students</h2>

                        <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                            Manage my students across disciplines.
                        </p>
                    </a>

                    <div className='modals-area'>
                        <dialog className="modal" id="instructors_action_modal">
                            <form method="dialog" className="modal-box bg-white w-11/12 max-w-5xl">
                                <div className="modal-action">
                                    <a href="#" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</a>
                                </div>
                                {/* <InstructorsDen /> */}
                                <InstructorMartialArts martialArts={disciplines} />
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

export default InstructorsAction;