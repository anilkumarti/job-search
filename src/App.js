import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import JobCard from "./components/JobCard/JobCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import {
  collection,
  query,
  orderBy,
  limit,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase-config";

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(null);
  const fetchJobs = async () => {
    setCustomSearch(false);

    
      if (unsubscribe) {
        unsubscribe();
        setUnsubscribe(null); // Ensure old listeners are cleared
      }
   

    try {
      const jobsRef = query(
        collection(db, "jobs"),
        orderBy("postedOn", "desc"),
        limit(23)
      );

      const listner = onSnapshot(jobsRef, (snapshot) => {
        const tempjobs = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          postedOn: doc.data().postedOn,
        }));
        setJobs(tempjobs);
      });
      setUnsubscribe(() => listner);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchJobsCustom = async (jobCreteria) => {
    setCustomSearch(true);
    if (unsubscribe) unsubscribe();

    try {
      const filters = [];
if (jobCreteria.type) filters.push(where("type", "==", jobCreteria.type));
if (jobCreteria.title) filters.push(where("title", "==", jobCreteria.title));
if (jobCreteria.experience) filters.push(where("experience", "==", jobCreteria.experience));
if (jobCreteria.location) filters.push(where("location", "==", jobCreteria.location));

      const jobsRef = query(
        collection(db, "jobs"),
       ...filters, orderBy("postedOn","desc"),
        limit(15)
      );

      const listener = onSnapshot(jobsRef, (snapshot) => {
        const tempJobs = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          postedOn: doc.data().postedOn,
        }));
        setJobs(tempJobs);
      });

      setUnsubscribe(() => listener);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
  
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Header />

      <Searchbar fetchJobsCustom={fetchJobsCustom} />
      {customSearch && (
        <div className="flex justify-end mb-2">
        <button onClick={fetchJobs} className="flex pl-[1250px] mb-2 ">
          <p className="bg-blue-500 px-10 py-2 rounded-md text-white ">
            Clear Filter
          </p>
        </button>
        </div>
      )}
       
      { jobs.length===0? (
        <div className="flex justify-center mt-10"> 
        <p className="text-gray-500 text-lg font-semibold"> No jobs matching... </p>  </div>
      ) :
      jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}

export default App;
