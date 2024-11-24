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
  console.log("dd", jobCreteria);
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
        <option value="" disabled hidden selected>
          Job Role
        </option>
        <option value="React js Developer"> React js Developer</option>
        <option value="Data scientist"> Data scientist</option>
        <option value="HR"> HR</option>
        <option value="Full stack developer"> Full stack developer</option>
        <option value="office help"> office help</option>
      </select>
      <select
        onChange={handleChange}
        name="type"
        value={jobCreteria.type}
        className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden selected>
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
        <option value="" disabled hidden selected>
          {" "}
          Location
        </option>
        <option value="Pune"> Pune </option>
        <option value="Delhi"> Delhi </option>
        <option value="Gurugram"> Gurugram</option>
      </select>
      <select
        onChange={handleChange}
        name="experience"
        value={jobCreteria.experience}
        className="w-64 py-3 pl-4 bg-zinc-200 font-semibold rounded-md"
      >
        <option value="" disabled hidden selected>
         
          Experience
        </option>
        <option value="Fresher"> Fresher </option>
        <option value="0-2"> 0-2 </option>
        <option value="2-5"> 2-5 </option>
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
