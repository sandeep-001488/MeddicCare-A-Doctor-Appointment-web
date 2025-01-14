"use client";
import React from "react";
import { useState, useEffect } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
const params=usePathname();
const category=params.split('/')[2]

  useEffect(() => {
    getCategoryList();    
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory()
      .then((res) => {
        setCategoryList(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };
  return (
    <div className="h-screen mt-5 flex flex-col">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categoryList &&
              categoryList.map((item, index) => (
                <CommandItem key={index}>
                  <Link href={"/search/"+item.attributes.name} className={`p-2 flex gap-5 items-center text-[12px] text-blue-500  rounded-md cursor-pointer w-full ${category==item.attributes.name && 'bg-blue-100'}`} >
                    <Image
                      src={item.attributes?.icon?.data?.attributes?.url}
                      height={25}
                      width={25}
                      alt="icon"
                    />
                    <label> {item.attributes.name} </label>
                  </Link>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    </div>
  );
}

export default CategoryList;
