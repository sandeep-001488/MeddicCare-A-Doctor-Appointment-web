"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import DoctorDetails from "../_components/DoctorDetails";
import DoctorSuggestionList from "../_components/DoctorSuggestionList";

function Details({ params }) {
  const [doctorData, setDoctorData] = useState({});

  useEffect(() => {
    if (params.recordid) {
      fetchDoctorById();
    } else {
      console.error("Record ID is missing");
    }
  }, [params.recordid]);

  const fetchDoctorById = () => {
    GlobalApi.getDoctorById(params.recordid)
      .then((resp) => {
        setDoctorData(resp.data.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor data:", error);
      });
  };

  return (
    <div className="p-5 md:px-20">
      <h2 className="font-bold text-[22px]"> Details</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* doctor details */}
        <div className="col-span-3">
          {doctorData && <DoctorDetails doctorData={doctorData} />}
        </div>
        {/* doctor suggestions */}
        <div className="">
          <DoctorSuggestionList
            id={params.recordid}
            category={doctorData.attributes?.categories?.data?.attributes?.name}
          />
        </div>
      </div>
    </div>
  );
}

export default Details;
