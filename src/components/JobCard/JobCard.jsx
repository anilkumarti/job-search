import dayjs from "dayjs";
import React from "react";

const JobCard = (props) => {
  const date1 = dayjs(Date.now());
  const diffInDays = date1.diff(props.postedOn, "day");

  return (
    <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-40 mb-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-6 py-4 bg-zinc-200 rounded-md border border-black shadow-lg hover:border-blue-500 hover:translate-y-1 hover:scale-103 transition-all duration-200">
        <div className="flex flex-col items-start gap-3 w-full md:w-auto">
          <h1 className="text-base sm:text-lg font-semibold">
            {props.title} - {props.company}
          </h1>
          <p className="text-sm sm:text-base">
            {props.type} &#x2022; {props.experience} &#x2022; {props.location}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {props.skills.map((skill, index) => (
              <p
                key={index}
                className="text-gray-500 text-xs sm:text-sm py-1 px-2 rounded-md border border-black"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start md:items-center gap-2 sm:gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <p className="text-gray-500 text-xs sm:text-sm">
            {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`} ago
          </p>
          <a href={props.job_link}>
            <button className="text-blue-500 border border-blue-500 px-6 py-2 text-xs sm:text-sm rounded-md w-full sm:w-auto">
              Apply
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
