import React, { useState } from "react";
import Login from "../login/Login";

const Navbar = () => {
  const [showLogin,setShowLogin]=useState(false);
    const toggleHandle=()=> {
      setShowLogin(prev=> !prev)
    }
  return (
    <div className="h-20 flex items-center bg-gray-800 w-full text-white px-20 justify-between relative">
      <div className="text-3xl pl-20 font-bold"> Job board. </div>
      <div> 
      <button className="bg-blue-500 px-4 py-2 rounded rounded shadow hover:bg-blue-600 transition" onClick={toggleHandle} >Login as Admin</button>
       {showLogin && <div className="absolute top-24 right-20 w-96 bg-white text-black p-6 rounded shadow-xl z-10">   <Login/> </div>}
      </div>
    </div>
  );
};

export default Navbar;
