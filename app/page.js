"use client"
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";

import DoctorList from "./_components/DoctorList";
import GlobalApi from "./_utils/GlobalApi";
import { useEffect, useState } from "react";

export default function Home() {

const [doctorList,setDoctorList]=useState([]);


  const getDoctorsList = () => {
    GlobalApi.getDoctors()
      .then((res) => {
        setDoctorList(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  };
  
  useEffect(() => {
    getDoctorsList();
  }, []);

  
  return (
    <div >
      <Hero />
      <CategorySearch />
      <DoctorList doctorList={doctorList} />
    </div>
  );
}
