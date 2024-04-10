import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
// import { AuthContext } from '@/components/layout/AuthPage';
import { AuthContext } from 'zkshield';
import DashboardContainerDataLoader from './DashboardContainerDataLoader';

export interface DashboardContainerProps {
    // Define any props you want to pass to the component here
    showDummyData: boolean;
    dummyDataIsInstructor: boolean;
}
const DashboardContainer: React.FC<DashboardContainerProps> = ({ showDummyData, dummyDataIsInstructor }) => {

    const [authState, setAuthState] = useContext(AuthContext);
    const [creator, setCreator] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState(true);

    useEffect(() => {
        // Open the modal on page load
        setIsModalOpen(true);
    }, []);

    const handleSelection = (isCreator: boolean) => {
        setCreator(isCreator);
        setIsModalOpen(false);
        setAuthState({ ...authState, creator: isCreator });

        console.log(creator === true ? "creator selected" : "owner selected");
    };
    return (
        <>
            {/* { authState.userAuthenticated && <DashboardContainerDataLoader showDummyData={showDummyData} dummyDataIsInstructor={dummyDataIsInstructor} /> } */}
            {/* add modal here */}
            <div className="App">
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-80">
                        <div className="bg-white p-6 rounded-lg shadow-md relative z-50">
                            <h2 className="text-xl font-semibold mb-4">Who are you?</h2>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 mr-4 rounded"
                                onClick={() => handleSelection(true)}
                            >
                                Creator
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded"
                                onClick={() => handleSelection(false)}
                            >
                                Owner
                            </button>
                        </div>
                    </div>
                )}

                {/* Semi-transparent overlay with a higher z-index */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-60"></div>
                )}

                {/* <p>
                You selected: {creator === null ? 'No selection yet' : creator ? 'Creator' : 'Owner'}
            </p> */}
            </div>
            <DashboardContainerDataLoader showDummyData={showDummyData} dummyDataIsInstructor={dummyDataIsInstructor} creator={creator} />
        </>

    );
};

export default DashboardContainer;


