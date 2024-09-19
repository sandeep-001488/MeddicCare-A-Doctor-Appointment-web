"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";

const MyBooking = () => {
  const { user } = useKindeBrowserClient();
  const [bookingList, setBookingList] = useState([]);
  useEffect(() => {
    const getUserBookingsList = () => {
      GlobalApi.getUserBookingList(user?.email).then((res) => {
        // console.log(res.data.data);
        setBookingList(res.data.data);
      });
    };
    getUserBookingsList();
  }, [user]);
  const filterUserBooking = (type) => {
    const now = new Date();
    const result = bookingList.filter((item) => {
      const bookingDate = new Date(item.attributes.date);

      if (type === "upcoming") {
        return bookingDate >= now;
      } else if (type === "expired") {
        return bookingDate < now;
      }
      return false;
    });

    // console.log(result);
    return result;
  };

  return (
    <div className="px-4 sm:px-10 mt-20 ">
      <h2 className="font-bold text-2xl">My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className="w-full justify-around border-[1px] sm:justify-start md:justify-around ">
          <TabsTrigger value="upcoming">
            <Button className="border-red-600 font-bold bg-blue-500 hover:bg-pink-500">
              Upcoming
            </Button>
          </TabsTrigger>

          <TabsTrigger value="expired">
            <Button
            className="border-red-600 font-bold bg-red-500 hover:bg-pink-500"

            >Expired</Button>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingList
            bookingList={filterUserBooking("upcoming")}
            expired={false}
          />
        </TabsContent>
        <TabsContent value="expired">
          <BookingList
            bookingList={filterUserBooking("expired")}
            expired={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBooking;
