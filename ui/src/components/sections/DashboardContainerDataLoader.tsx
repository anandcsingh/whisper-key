import Authentication from '@/modules/Authentication';
import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage';
import { UserMartialArts, UserMartialArt } from '@/modules/UserMartialArts';
import DashboardProfile from './DashboardProfile';
import DashboardActions from './DashboardActions/DashboardActions';
import InstructorMartialArts from './InstructorMartialArts';
import LineagePage from './LineagePage';
import DashboardLineageHero from './DashboardLineageHero';
import DashboardStats from './DashboardStats';
import { get } from 'http';
import NotificationBox from './NotificationBox';

export interface DashboardContainerProps {
    // Define any props you want to pass to the component here
    showDummyData: boolean;
    dummyDataIsInstructor: boolean;
  }
const DashboardContainerDataLoader: React.FC<DashboardContainerProps> = ({ showDummyData, dummyDataIsInstructor }) => {

    const [disciplinesLoaded, setDisciplinesLoaded] = useState(false);
    const [disciplines, setDisciplines] = useState(Array<UserMartialArt>());
    const [authState, _]  = useContext(AuthContext);
    const [isInstructor, setIsInstructor] = useState(false);

    const getDummyAddress = () => {
        if(dummyDataIsInstructor) {
            return 'B62qqzMHkbogU9gnQ3LjrKomimsXYt4qHcXc8Cw4aX7tok8DjuDsAzx';
        }
        else {
            return 'B62qjBcYihfVGHyQGuxgG5m4QbPrq6jEEMys5p4fe4Pt33CmWy7Bvuq';
        }
    }
    useEffect(() => {

        (async () => {
            console.log("DashboardContainer: useEffect loaded");
            if(!authState.userAuthenticated && showDummyData) {
                console.log("USING DUMMY DATA!");
                authState.userAuthenticated = true;
                authState.userAddress = getDummyAddress();
                Authentication.address = getDummyAddress();
            }

            if (authState.userAuthenticated) {
                const disciplines = new UserMartialArts();
                const userDisciplines = await disciplines.getMartialArts(authState.userAddress);
                console.log("found user disciplines: " + userDisciplines.length);
                setDisciplines(userDisciplines);
                setDisciplinesLoaded(true);

                // get a boolen if the user is an instructor from the userDisciplines collection
                const instructor = userDisciplines.find((discipline) => discipline.isInstructor);
                setIsInstructor(instructor ? true : false);
            } 

        })();

    }, []);

    return (
        <div className="bg-white lg:py-10 min-h-screen">
            <section className="bg-white place-self-center lg:col-span-7 space-y-8">
                <div className="m-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-8">
                    <NotificationBox />
                    <div>
                        {disciplinesLoaded &&
                            <DashboardProfile disciplines={disciplines} />}
                        {!disciplinesLoaded &&
                            <div className='m-auto'>
                                <span className="loading loading-dots loading-lg"></span>

                            </div>
                        }
                    </div>
                </div>
            </section>
            <section className="bg-white place-self-center lg:col-span-7 space-y-8">
                <div className="m-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

                    <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
                        <DashboardLineageHero />
                        {disciplinesLoaded && <DashboardActions isInstructor={isInstructor} disciplines={disciplines} />}
                        {!disciplinesLoaded &&
                            <div className='m-auto'>
                                <span className="loading loading-dots loading-lg"></span>

                            </div>
                        }
                    </div>
                </div>
            </section>
            <DashboardStats />

        </div>

        // <div className="pt-24">
        //                 {disciplinesLoaded && <DashboardProfile disciplines={disciplines} />}
        //                 {disciplinesLoaded && <DashboardActions isInstructor={isInstructor} />}
        //                 {disciplinesLoaded && <InstructorMartialArts disciplines={disciplines} />}
        //                 {/* {authState.userAuthenticated && 
        //                     <LineagePage />
        //                 } */}
        //                 <LineagePage />

        //             </div>
    );
};

export default DashboardContainerDataLoader;

