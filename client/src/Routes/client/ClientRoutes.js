import {  Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import HomePage from "../../pages/client/Homepage";
import PlayersPage from "../../pages/client/PlayersPage";
import "../../assets/css/client/main.css";

const NotFound = React.lazy(() => import('../../pages/client/404/NotFound'));

function ClientRoutes() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/players" element={<PlayersPage/>} />
          

      </Routes>
    </Suspense>
  );
}

export default ClientRoutes;
