import { Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';
import Loading from '../../Layouts/admin/Loading';

const Dashboard = React.lazy(() => import('../../pages/admin/Dashboard'));

const Sets = React.lazy(() => import('../../pages/admin/Sets/Sets'));
const Players = React.lazy(() => import('../../pages/admin/Players/Players'));
const Teams = React.lazy(() => import('../../pages/admin/Teams/Team'));    



function AdminRoutes() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Sets */}
          <Route path='/' element={<Dashboard />} />
          <Route path="/sets" element={<Sets />} />
          <Route path="/players" element={<Players />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default AdminRoutes;
