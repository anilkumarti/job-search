import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import JobCard from "./components/JobCard/JobCard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar/Navbar";
import Searchbar from "./components/Searchbar/Searchbar";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { db } from "./firebase-config";


function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch]=useState(false);
  const fetchJobs = async () => {
    setCustomSearch(false); 
    const tempJobs = []; 
    try {
      const jobsRef = query(collection(db, "jobs"));
      const q = query(jobsRef, orderBy("postedOn", "desc"), limit(31));

      const req = await getDocs(q);
      req.forEach((job) => {
        tempJobs.push({
          ...job.data(),
          id: job.id,
          postedOn: job.data().postedOn,
        });
      });
      setJobs(tempJobs);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchJobsCustom = async (jobCreteria) => {
   setCustomSearch(true);  
    const tempJobs = [];
    try {
      const jobsRef = query(collection(db, "jobs"));
      const q =  query(
        jobsRef,
        where("type", "==", jobCreteria.type),
        where("title", "==", jobCreteria.title),
        where("experience", "==", jobCreteria.experience),
        where("location", "==", jobCreteria.location),
        orderBy("postedOn", "desc"),
        limit(15)
      );

      const req = await getDocs(q);
      req.forEach((job) => {
        tempJobs.push({
          ...job.data(),
          id: job.id,
          postedOn: job.data().postedOn,
        });
      });
      setJobs(tempJobs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchJobs().then(() => {
      if (!isMounted) return;
    });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <Header />
       
      <Searchbar fetchJobsCustom={fetchJobsCustom}  />
   { customSearch && <button onClick={fetchJobs} className="flex pl-[1250px] mb-2 "> 
    <p className="bg-blue-500 px-10 py-2 rounded-md text-white ">
     Clear Filter
    </p></button>}
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
     
    </div>
  );
}

export default App;
