import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import '../../assets/css/admin/style.css';
import '../../assets/css/admin/main.css';
import '../../assets/css/admin/form.css';

const Hoc = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
    </>
  );
};

export default Hoc;
