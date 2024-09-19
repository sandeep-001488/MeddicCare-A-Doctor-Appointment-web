import Image from "next/image";
import Link from "next/link";
import React from "react";

const DoctorList = ({ doctorList, heading = 'Popular Doctors' }) => {
  return (
    <div className="mb-10 px-8">
      <h2 className="font-bold text-3xl">{heading}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-5">
        {doctorList && doctorList.length > 0
          ? doctorList.map((item) => (
              <div
                key={item.id} 
                className="border-[1px] rounded-lg  p-3 cursor-pointer hover:border-blue-500 hover:shadow-sm"
              >
                <Image
                  src={item.attributes.image.data.attributes.url}
                  alt={item.attributes.name}
                  width={500}
                  height={200}
                  className="h-[200px] w-full object-cover rounded-xl"
                />
                <div className="mt-3 items-baseline flex flex-col gap-1">
                  <h2 className="text-[12px] text-center bg-blue-100 p-1 rounded-full px-2 text-blue-500">
                    {item.attributes?.categories?.data?.attributes?.name}
                  </h2>
                  <h2 className="font-bold">{item.attributes.name}</h2>
                  <h2 className="text-blue-500 text-sm">
                    Experience : {item.attributes?.years_of_Experience} yrs
                  </h2>
                  <h2 className="text-gray-500 text-sm">
                    {item.attributes?.address}
                  </h2>
                  <Link href={'/details/'+item?.id} className="w-full">
                  <h2 className="p-2 px-3 border-[1px] border-blue-500 text-blue-500 rounded-full w-full text-center text-[11px] mt-2 cursor-pointer font-bold hover:bg-blue-500 hover:text-white">
                    Book Now
                  </h2>
                  </Link>
                </div>
              </div>
            ))
          : // Skeleton effect for loading state
            [1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-[220px] bg-slate-100 w-full  rounded-lg animate-pulse"></div>  // Use 'item' as the key for fallback elements
            ))}
      </div>
    </div>
  );
};

export default DoctorList;
