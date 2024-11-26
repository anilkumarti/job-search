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
    <div>
      <form>
        <label> Enter job title</label>
        <input
          name="title"
          type="text"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label> Enter experience needed</label>
        <input
          name="experience"
          type="number"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label> Enter job link</label>
        <input
          name="job link"
          type="text"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label> Enter location</label>
        <input
          name="location"
          type="text"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label> Enter job posting date</label>
        <input
          name="postedOn"
          type="date"
          onChange={(e) => handleInput(e.target.name, e.target.value)}
        />
        <label> Enter company's name</label>
        <input
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
        <label> Enter skills needed</label>
        { currValue.skills.map((skill,index)=> (
          <div key={index}>  <input
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
