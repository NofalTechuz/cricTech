import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container">
      <h1>Cricket Team Viewer</h1>
      <div id="sets-container">
        <Link to="/players?set=A" className="set-card">Set A</Link>
        <Link to="/players?set=B" className="set-card">Set B</Link>
        <Link to="/players?set=C" className="set-card">Set C</Link>
      </div>
    </div>
  );
};

export default HomePage;
