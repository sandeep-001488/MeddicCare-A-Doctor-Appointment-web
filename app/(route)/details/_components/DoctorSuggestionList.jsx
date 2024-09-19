import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DoctorSuggestionList = ({ category, id }) => {
  const [doctorList, setDoctorList] = useState([]);
  
  
  useEffect(() => {
    const getDoct = () => {
      GlobalApi.getDoctors().then((doctors) => {
        const fetchedDoctors = doctors.data.data;
  
        // Sorting logic
        const sortedDoctors = fetchedDoctors.sort((a, b) => {
          const aCategories = a.attributes.categories?.data || [];
          const bCategories = b.attributes.categories?.data || [];
  
          const getCategoryName = (categories) => {
            if (Array.isArray(categories)) {
              return categories.some(
                (cat) =>
                  cat?.attributes?.name &&
                  category && // Ensure category is defined
                  cat.attributes.name.toLowerCase() === category.toLowerCase()
              );
            } else if (
              typeof categories === "object" &&
              categories?.attributes?.name
            ) {
              return (
                category && // Ensure category is defined
                categories.attributes.name.toLowerCase() ===
                category.toLowerCase()
              );
            }
            return false;
          };
  
          const aIsCategory = getCategoryName(aCategories);
          const bIsCategory = getCategoryName(bCategories);
  
          if (aIsCategory && !bIsCategory) {
            return -1; // Move doctors with the specified category up
          } else if (!aIsCategory && bIsCategory) {
            return 1; // Move others down
          } else {
            return 0;
          }
        });
  
        setDoctorList(sortedDoctors);
        
      });
    };
  
    // Only fetch doctors if the category is defined
    if (category) {
      getDoct();
    }
  }, [category]);

   

  return (
    <div className="p-4 border-[1px] mt-5 md:ml-5">
      <h2 className="mb-3 font-bold">Suggestions</h2>
      {doctorList &&
        doctorList
          .filter((doctor) => String(doctor.id) !== String(id))
          .map((doctor) => (
            <Link
              key={doctor.id}
              href={"/details/" + doctor.id}
              className="mb-4 p-3 shadow-sm w-full cursor-pointer flex items-center gap-3 text-justify bg-gray-50 transition-transform duration-500 hover:scale-110 ease-in-out"
            >
              <Image
                src={doctor.attributes?.image?.data?.attributes?.url}
                width={70}
                height={70}
                className="w-[70px] h-[70px] rounded-full object-cover"
                alt={doctor.attributes?.name}
              />
              <div className="mt-3 flex-col flex">
                <h2 className="text-[12px] text-center bg-blue-100 p-1 rounded-full px-2 text-blue-500 ">
                  {doctor.attributes?.categories?.data?.attributes?.name ||
                    "Unknown"}
                </h2>
                <h2 className="text-[14px] mt-1 text-red-500 font-semibold">
                  {doctor.attributes?.name}
                </h2>
                <h2 className="text-blue-400">
                  {doctor.attributes?.years_of_Experience} yrs
                </h2>
              </div>
            </Link>
          ))}
    </div>
  );
};

export default DoctorSuggestionList;
