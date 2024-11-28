import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase-config";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SkillsList from "./Skils";
import Select from "react-select";


const AddJobs = () => {
  const [currValue, setCurrValue] = useState({
    title: "",
    experience: "",
    "job link": "",
    location: "",
    postedOn: "",
    company: "",
    skills: [""],
  });
  const handleInput = (name, value) => {
    setCurrValue((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = async (e) => {
   

    e.preventDefault();

    const { title, experience, location, postedOn, company, skills } = currValue;

    if (
      !title.trim() ||
      !experience.trim() ||
      !location.trim() ||
      !postedOn.trim() ||
      !company.trim() ||
      skills.filter((skill) => skill.trim()).length === 0
    ) {
     toast.warning("please fill out all fields", {
      position: "top-center",
      autoClose: 3000,
  })
      return;
    }
    const filteredSkills = currValue.skills.filter(
      (skills) => skills.trim().length>0
    );
    const jobData = {
      ...currValue,
      skills: filteredSkills,
    };
    try {
      const docRef = await addDoc(collection(db, "jobs"), jobData);
      console.log("document written with Id", docRef.id);
      toast.success("Jobs added successfully!!", {
        position: "top-center",
        autoClose: 3000,
    }) 
     setCurrValue(()=>
      ({
       title: "",
       experience: "",
       "job link": "",
       location: "",
       postedOn: "",
       company: "",
       skills: [""],
     }))
    
    } catch (error) {
      console.log(error);
      toast.error("Error in adding jobs", {
        position: "top-center",
        autoClose: 3000,
    })
   
    }
  };
 const handleSkillChange=(SelectedSkill)=> {
  const skills=SelectedSkill.map(skill=>skill.value);
  setCurrValue((prev)=>({...prev,skills}))
 }
   return  (<div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800"> Add Jobs</h2>
        <label className="block text-sm font-medium mb-2">
          {" "}
          Enter job title
        </label>
        <input
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          name="title"
          value={currValue.title}
          type="text"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label className="block text-sm font-medium mb-2">
          {" "}
          Enter experience needed
        </label>
        <input
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          name="experience"
          value={currValue.experience}
          type="number"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label className="block text-sm font-medium mb-2">
          {" "}
          Enter job link
        </label>
        <input
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          name="job link"
          value={currValue["job link"]}
          type="text"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label className="block text-sm font-medium mb-2">
          {" "}
          Enter location
        </label>
        <input
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          name="location"
          value={currValue.location}
          type="text"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label className="block text-sm font-medium mb-2">
          {" "}
          Enter job posting date
        </label>
        <input
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          name="postedOn"
          value={currValue.postedOn}
          type="date"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label className="block text-sm font-medium mb-2">
          {" "}
          Enter company's name
        </label>
        <input
          className="w-full border border-gray-300 rounded-md p-2 mb-4"
          name="company"
          value={currValue.company}
          type="text"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
         <label>Job type</label> 
       <select> 
       <option value="Remote">Remote</option>
       <option value="Hybrid">Hybrid</option>
       <option value="Office">Office</option>
       
       
       </select>
        <label className="block text-sm font-medium mb-2">
         
          Enter skills needed
        </label>
        <Select options={SkillsList} 
        value={currValue.skills.map(skill=> ({value:skill, label:skill }))}
        isMulti onChange={handleSkillChange} 
        className="mb-4"/>
       
        <input    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
    type='submit'/>
      </form>
    </div>
  );
};

export default AddJobs;
