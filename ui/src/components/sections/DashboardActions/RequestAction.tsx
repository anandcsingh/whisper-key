import { DashboardActionsProps } from "./DashboardActions";
import AddForm from "../Forms/AddForm";
import AddVerifiableCredentialForm from "../Forms/AddVerifiableCredentialForm";
import DashBoardIssueCredentials from "../DashbaordIssueCredentials";


const RequestAction: React.FC<DashboardActionsProps> = ({ isInstructor }) => {

    return (
        <div>
            <a className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                href='#issue_credential_modal'>

                <span className="inline-block rounded-lg bg-gray-50 p-3">
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#652dc5" viewBox="0 0 20 18">
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                    </svg>
                </span>

                <h2 className="mt-2 font-bold">Request</h2>

                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                    Request Verifiable Credential
                </p>
            </a>

            {/* <DashBoardIssueCredentials /> */}
          
        </div>
    );
}

export default RequestAction;