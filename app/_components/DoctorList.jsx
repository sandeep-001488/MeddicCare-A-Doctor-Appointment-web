import Image from "next/image";
import Link from "next/link";
import React from "react";

const DoctorList = ({ doctorList, heading = "Popular Doctors" }) => {
  return (
    <div className="mb-10 px-8">
      <h2 className="font-bold text-3xl">{heading}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-5">
        {doctorList && doctorList.length > 0
          ? doctorList.map((item) => {
              const imageUrl = item?.attributes?.image?.data?.attributes?.url;
              const categoryName =
                item?.attributes?.categories?.data?.attributes?.name;
              const name = item?.attributes?.name;
              const experience = item?.attributes?.years_of_Experience;
              const address = item?.attributes?.address;

              return (
                <div
                  key={item.id}
                  className="border-[1px] rounded-lg p-3 cursor-pointer hover:border-blue-500 hover:shadow-sm"
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={name || "Doctor"}
                      width={500}
                      height={200}
                      className="h-[200px] w-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="h-[200px] w-full bg-slate-200 rounded-xl" />
                  )}
                  <div className="mt-3 items-baseline flex flex-col gap-1">
                    {categoryName && (
                      <h2 className="text-[12px] text-center bg-blue-100 p-1 rounded-full px-2 text-blue-500">
                        {categoryName}
                      </h2>
                    )}
                    {name && <h2 className="font-bold">{name}</h2>}
                    {experience && (
                      <h2 className="text-blue-500 text-sm">
                        Experience : {experience} yrs
                      </h2>
                    )}
                    {address && (
                      <h2 className="text-gray-500 text-sm">{address}</h2>
                    )}
                    <Link href={"/details/" + item?.id} className="w-full">
                      <h2 className="p-2 px-3 border-[1px] border-blue-500 text-blue-500 rounded-full w-full text-center text-[11px] mt-2 cursor-pointer font-bold hover:bg-blue-500 hover:text-white">
                        Book Now
                      </h2>
                    </Link>
                  </div>
                </div>
              );
            })
          : [1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-[220px] bg-slate-100 w-full rounded-lg animate-pulse"
              />
            ))}
      </div>
    </div>
  );
};

export default DoctorList;