// https://stackoverflow.com/questions/73479439/how-to-trigger-an-custom-alert-component-in-a-different-component
//https://stackblitz.com/edit/react-ts-nv3cv2?file=ToggleAlert.tsx
import { useContext } from "react";
import { AuthContext } from "../layout/AuthPage";

export default function NotificationBox() {
    const [authState, setAuthState] = useContext(AuthContext);

    const clearAlert = async (event: any) => {
        setAuthState({ ...authState, alertAvailable: false, alertMessage: "", alertNeedsSpinner: false });
    }

    return (

        <>
        {authState.alertAvailable &&
        <div>
            <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
                {authState.alertNeedsSpinner && <span className="loading loading-bars mr-2 loading-xs"></span>}
                <span dangerouslySetInnerHTML={{__html: authState.alertMessage}}></span>
                <a href="#" onClick={clearAlert} className="btn btn-sm btn-circle btn-ghost float-right">X</a>
            </div>
            <div className='divider'></div>
            </div>
        }
        </>
    );
  }