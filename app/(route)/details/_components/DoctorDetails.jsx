import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import BookAppointment from "./BookAppointment";

function DoctorDetails({ doctorData }) {
  
  const socialMediaList = [
    {
      id: 1,
      icon: "/u_tube.jpeg",
      url: "/",
    },
    {
      id: 2,
      icon: "/linkedIn.png",
    },
    {
      id: 3,
      icon: "/twitter.png",
      url: "/",
    },
    {
      id: 4,
      icon: "/fb.png",
      url: "/",
    },
  ];
  return (
    <>
    <div className=" grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg">
      <div className="">
        <Image
          src={doctorData.attributes?.image?.data.attributes.url}
          height={200}
          width={200}
          alt="doctor-img"
          className="rounded-lg w-full h-[280px] object-cover"
        />
      </div>
      <div className="col-span-2 mt-2 md:px-5 flex flex-col gap-3 items-baseline ">
        <h2 className="font-bold text-2xl">{doctorData.attributes?.name} </h2>
        <h2 className="flex gap-2 text-gray-500 text-md">
          <GraduationCap />
          <span>{doctorData.attributes?.years_of_Experience}</span>
        </h2>
        <h2 className="text-md flex gap-2 text-gray-400">
          <MapPin />
          <span>{doctorData.attributes?.address}</span>
        </h2>
        <h2 className="text-[12px] text-center bg-blue-100 p-1 rounded-full px-2 text-blue-500">
          {doctorData.attributes?.categories?.data?.attributes?.name}
        </h2>
        <div className="flex gap-3 items-center h-[28px] rounded-full">
        {socialMediaList.map((item) => (
            <a key={item.id} href={item.url || "#"}>
              <Image
                src={item.icon}
                alt="icon"
                height={30}
                width={30}
                className="cursor-pointer"
              />
            </a>
          ))}
        </div>
        {/* <Button className="mt-3 rounded-full bg-blue-500 hover:bg-red-600">Book Appointment</Button> */}
        <BookAppointment doctorData={doctorData}/>
      </div>
    </div>
    <div className="p-3 border-[1px] rounded-lg mt-5">
        <h2 className="font-bold text-[20px]">About Me</h2>
        <p className="text-gray-500 tracking-wide mt-2" >{doctorData.attributes?.about}</p>
    </div>
    </>
  )
}

export default DoctorDetails;
