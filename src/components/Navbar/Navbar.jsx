import React, { useState } from "react";
import Login from "../login/Login";
import AddJobs from "../../Addjobs/addJobs";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddJob, setShowAddJob] = useState(false);
  const toggleHandle = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      setShowLogin(false);
    } else {
      setShowLogin((prev) => !prev);
    }
  };
  const closeModal = (e) => {
    if (e.target.id === "modal-overlay") {
      setShowLogin(false);
    }
  };
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };
  //add job toggle function
  const jobToggle = () => {
    setShowAddJob((prev) => !prev);
  };
  const closeAddJobsModal = (e) => {
    if (e.target.id === "modal-overlay2") {
      setShowAddJob(false);
    }
  };
  return (
    <>
      <div className="h-20 flex items-center bg-gray-800 w-full text-white px-20 justify-between relative">
        <div className="text-3xl pl-20 font-bold"> Job board. </div>
       
       { isLoggedIn && <button
          className="bg-blue-500 px-4 py-2 rounded rounded shadow hover:bg-blue-600 transition"
          onClick={jobToggle}
        >
          Add Jobs
        </button>
        }
        <div>
          <button
            className="bg-blue-500 px-4 py-2 rounded rounded shadow hover:bg-blue-600 transition"
            onClick={toggleHandle}
          >
            {isLoggedIn ? "Logout" : "Login as Admin"}
          </button>
          <div />

          <div />
          {showAddJob && (
            <div
              id="modal-overlay2"
              className="absolute top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-md z-10 flex justify-center items-start pt-24"

              onClick={(e) => closeAddJobsModal(e)}
            >
              <div
                className="relative w-96 bg-white text-black p-6 rounded shadow-xl transition-transform transform scale-95 hover:scale-100"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={jobToggle}>
                  
                  ✖
                </button>
              
              <AddJobs />
              </div>
            </div>
          )}

          {showLogin && (
            <div
              id="modal-overlay"
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10 flex justify-center items-start pt-24"
              onClick={(e) => closeModal(e)}
            >
              <div
                className="relative w-96 bg-white text-black p-6 rounded shadow-xl transition-transform transform scale-95 hover:scale-100"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  onClick={toggleHandle}
                >
                  ✖
                </button>
                <Login onLoginSuccess={handleLoginSuccess} />
              </div>
            </div>
          )}
        </div>

        <div />
      </div>
    </>
  );
};

export default Navbar;
