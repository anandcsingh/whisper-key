import Authentication from '@/modules/Authentication';
import React, { Component } from 'react';
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '@/components/layout/AuthPage';
import { UserMartialArts, UserMartialArt } from '@/modules/UserMartialArts';
import Add from '@/pages/add.page';
import AddAction from './AddAction';
import InstructorsAction from './InstructorsAction';
import ShareAction from './ShareAction';
import PromoteAction from './PromoteAction';
import RevokeAction from './RevokeAction';
import ProveAction from './ProveAction';

export interface DashboardActionsProps {
  // Define any props you want to pass to the component here
  isInstructor: boolean;
  disciplines: Array<UserMartialArt>;
}
const DashboardActions: React.FC<DashboardActionsProps> = ({ isInstructor, disciplines }) => {
  const [authState, _]  = useContext(AuthContext);

  return (
    <>
    {authState.userAuthenticated && 
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      
      <AddAction isInstructor={isInstructor} disciplines={disciplines} />
      <InstructorsAction isInstructor={isInstructor} disciplines={disciplines}/>
      <ShareAction isInstructor={isInstructor} disciplines={disciplines} />
      <PromoteAction isInstructor={isInstructor} disciplines={disciplines} />
      <RevokeAction isInstructor={isInstructor} disciplines={disciplines} />
      { (disciplines && disciplines.length > 0) && <ProveAction isInstructor={isInstructor} disciplines={disciplines} /> }
    </div>
}
    </>
  );
};

export default DashboardActions;