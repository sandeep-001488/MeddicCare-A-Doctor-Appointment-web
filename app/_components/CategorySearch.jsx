"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";

const CategorySearch = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);


  const getCategoryList = () => {
    GlobalApi.getCategory()
      .then((res) => {
        console.log(res.data.data );

        setCategoryList(res.data.data);
      })
      .catch((error) => {
        console.error("Errorrr fetching categories:", error);
      });
  };

  return (
    <div className="mb-10 items-center flex flex-col gap-2 px-5">
      <h2
        className="font-bold
       text-4xl tracking-wide"
      >
        Search <span className="text-blue-500">Doctors</span>{" "}
      </h2>
      <h2 className="text-gray-500 text-xl">
        Search and get your appointment in a click away...hello
      </h2>
      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Get your favourites.."
          className="hover:border-sky-500 text-teal-900"
        />
        <Button type="submit" className="bg-blue-700">
          Search
        </Button>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mt-5">
  {categoryList.length > 0 ? categoryList.map((item) => (
    <Link href={'/search/' + item.attributes.name}
      key={item.id}  // Use a unique id or identifier here
      className="flex flex-col items-center text-center gap-2 p-5 bg-blue-50 m-2 rounded-lg hover:scale-110 transition-all ease-in-out cursor-pointer"
    >
      <Image
        src={item.attributes?.icon?.data?.attributes?.url}
        width={40}
        height={40}
        alt="icon_img"
      />
      <label className="text-blue-600 text-s ">
        {item?.attributes?.name}
      </label>
    </Link>
  ))
  :
  [1, 2, 3, 4, 5, 6].map(item => (
    <div key={item} className="h-[130px] w-[120px] m-2 bg-slate-100 animate-pulse rounded-lg "></div>
  ))
  }
</div>

    </div>
  );
};

export default CategorySearch;
