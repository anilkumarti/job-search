import React, { useState } from "react";

const Searchbar = (props) => {
  const [jobCreteria, setJobCreteria] = useState({
    title: "",
    location: "",
    experience: "",
    type: "",
  });
  const handleChange = (e) => {
    setJobCreteria((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const search = async () => {
    await props.fetchJobsCustom(jobCreteria);
    console.log("search function is working", props);
  };
  return (
    <div className="flex gap-4 my-10 justify-center px-10">
      <select
        onChange={handleChange}
        name="title"
        value={jobCreteria.title}
        className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden>
          Job Role
        </option>
        <option value="Frontend Developer">Frontend Developer</option>
    <option value="Backend Developer">Backend Developer</option>
    <option value="Full Stack Developer">Full Stack Developer</option>
    <option value="React.js Developer">React.js Developer</option>
    <option value="Angular Developer">Angular Developer</option>
    <option value="DevOps Engineer">DevOps Engineer</option>
    <option value="Mobile App Developer">Mobile App Developer</option>
      </select>
      <select
        onChange={handleChange}
        name="type"
        value={jobCreteria.type}
        className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden>
          Job Type
        </option>
        <option value="Remote"> Remote </option>
        <option value="Office"> Office </option>
        <option value="Hybrid"> Hybrid </option>
      </select>
      <select
        onChange={handleChange}
        name="location"
        value={jobCreteria.location}
        className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden>
          {" "}
          Location
        </option>
        <option value="Pune"> Pune </option>
        <option value="Delhi"> Delhi </option>
        <option value="Gurugram"> Gurugram</option>
        <option value="Hyedarabad"> Hyedrabad</option>
        <option value="Bengaluru"> Bengluru</option>
      </select>
      <select
        onChange={handleChange}
        name="experience"
        value={jobCreteria.experience}
        className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden >
         
          Experience
        </option>
        <option value="0"> Experience </option>
        <option value="1"> 1 year  </option>
        <option value="2"> 2 years</option>
        <option value="3"> 3 years</option>
        <option value="4"> 4 years</option>
        <option value="5"> 5 years </option>
        <option value="6"> 6 years</option>
        <option value="7"> 7 years</option>
        <option value="8"> 8 years</option>
        <option value="9"> 9 years</option>
        <option value="10"> 10 years</option>

      </select>
      <button
        onClick={search}
        className="w-64 bg-blue-500 text-white py-3 rounded-md"
      >
        {" "}
        Search
      </button>
    </div>
  );
};

export default Searchbar;
