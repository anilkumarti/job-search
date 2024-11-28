import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase-config";

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
  const handleInput = (name,value) => {
    setCurrValue((prev)=> ( {...prev,[name]:value})

    )
  };
  const addItem=()=> {
    setCurrValue((prev)=> ({
      ...prev, skills:[...currValue.skills,""]
    }));
    
  }
  const removeItem=(index)=> {
const updatedSkills=currValue.skills.filter((_,i)=> i!==index);
setCurrValue((prev)=> ({
  ...prev, skills:updatedSkills
}));
}
  const handleSkillChange=(index, value)=>{
     const updatedSkills=[...currValue.skills];
      updatedSkills[index]=value;
     setCurrValue((prev)=> ({
      ...prev,skills: updatedSkills
     }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const filteredSkills=currValue.skills.filter(skills=>skills.trim()!==' ');
    const jobData={
      ...currValue, skills:filteredSkills
    }
    try {
      
      const docRef=await addDoc(collection(db,"jobs"),jobData)
     console.log("document written with Id",docRef.id);
     alert("Job added successfully");
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex items-center justify-center">
      <form className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
      <h2 className="text-2xl font-bold mb-6 text-gray-800"> Add Jobs</h2>
        <label className="block text-sm font-medium mb-2"> Enter job title</label>
        <input  className="w-full border border-gray-300 rounded-md p-2 mb-4"
          name="title"
          type="text"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label className="block text-sm font-medium mb-2"> Enter experience needed</label>
        <input  className="w-full border border-gray-300 rounded-md p-2 mb-4"
          name="experience"
          type="number"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label className="block text-sm font-medium mb-2"> Enter job link</label>
        <input  className="w-full border border-gray-300 rounded-md p-2 mb-4"
          name="job link"
          type="text"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label className="block text-sm font-medium mb-2"> Enter location</label>
        <input  className="w-full border border-gray-300 rounded-md p-2 mb-4"
          name="location"
          type="text"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label className="block text-sm font-medium mb-2"> Enter job posting date</label>
        <input  className="w-full border border-gray-300 rounded-md p-2 mb-4"
          name="postedOn"
          type="date"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label className="block text-sm font-medium mb-2"> Enter company's name</label>
        <input  className="w-full border border-gray-300 rounded-md p-2 mb-4"
          name="company"
          type="text"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        {/* <label> Enter company name</label> */}
        {/* <input
          name="company"
          type="text"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        /> */}
        <label className="block text-sm font-medium mb-2"> Enter skills needed</label>
        { currValue.skills.map((skill,index)=> (
          <div  className="flex items-center mb-4" key={index}>  <input
          name="skills"
          type="text"
          value={skill}
          onChange={(e) => handleSkillChange(index, e.target.value)}
        />
        <button onClick={(e)=>{ e.preventDefault();
          removeItem(index) }}> Remove Skill</button>
         </div>
        ))

        }
          <button  onClick={(e)=> { e.preventDefault(); addItem()}}> Add Skill</button>
        <button onClick={handleSubmit}>Submit </button>
      </form>
    </div>
  );
};

export default AddJobs;
