import React, { useState } from "react";
import Login from "../login/Login";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const toggleHandle = () => {
    if(isLoggedIn)
    {
      setIsLoggedIn(false);
      setShowLogin(false);
    }
    else {
    setShowLogin((prev) => !prev);
    }
  };
  const closeModal = (e) => {
    if (e.target.id === "modal-overlay") {
      setShowLogin(false);
    }
  };
  const handleLoginSuccess=()=> {
    setIsLoggedIn(true);
    setShowLogin(false);
  }
  return (
   <>
    <div className="h-20 flex items-center bg-gray-800 w-full text-white px-20 justify-between relative">
      <div className="text-3xl pl-20 font-bold"> Job board. </div>
      <div>
        <button
          className="bg-blue-500 px-4 py-2 rounded rounded shadow hover:bg-blue-600 transition"
          onClick={toggleHandle}
        >
          {isLoggedIn? "Logout": "Login as Admin"}
        </button>
        <div/>
        <div/>

        {showLogin && (
          <div
            id="modal-overlay"
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10 flex justify-center items-start pt-24"
            onClick={(e) => closeModal(e)}
          >
            <div className="relative w-96 bg-white text-black p-6 rounded shadow-xl transition-transform transform scale-95 hover:scale-100"
            onClick={(e)=> e.stopPropagation()}
            >  
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={toggleHandle}
        >
        ✖
        </button>
        <Login onLoginSuccess={handleLoginSuccess}/>

      </div>
      </div>
    
        )}
        </div>
      <div/>
       </div>
       </>
  );
};

export default Navbar;
