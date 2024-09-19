import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";
import CancelAppointment from "./CancelAppointment";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";
import Link from "next/link";

const BookingList = ({ bookingList, expired }) => {
  console.log(bookingList);

  const onCancelBooking = (item) => {
    GlobalApi.cancelAppointment(item.id).then((res) => {
      console.log(res);
      if (res) {
        toast("Booking Cancelled successfully", {
          style: {
            backgroundColor: "blue",
            color: "white",
          },
        });
      }
    });
  };
  return (
    <div>
      {bookingList &&
        bookingList.map((item, index) => (
          <div
            key={index}
            className="flex lg:flex-row gap-4 items-center border p-5 m-3 rounded-lg sm:flex-col"
          >
            <Link href={`/details/${item.attributes?.doctor?.data?.id}`}>
              <Image
                src={
                  item.attributes?.doctor?.data?.attributes?.image?.data
                    ?.attributes?.url
                }
                className={`rounded-full h-[70px] w-[70px] object-cover ${expired?"opacity-50":""}`}
                width={100}
                height={100}
                alt="doctor-img"
              />
            </Link>
            <div className="flex flex-col gap-2 w-full">
              <h2
                className={`font-bold ${
                  expired ? "text-gray-400" : "text-blue-500"
                } text-[18px] items-center flex justify-between `}
              >
                {item.attributes.doctor.data.attributes.name}
                {!expired && (
                  <CancelAppointment
                    onContinueClick={() => onCancelBooking(item)}
                  />
                )}
              </h2>

              <h2
                className={
                  expired ? "flex gap-2 text-gray-500" : "flex gap-2 text-black"
                }
              >
                <MapPin
                  className={`${
                    expired ? "text-blue-200" : "text-blue-500"
                  } h-5 w-5`}
                />
                {item.attributes.doctor.data.attributes.address}
              </h2>
              <h2
                className={
                  expired ? "flex gap-2 text-gray-500" : "flex gap-2 text-black"
                }
              >
                <Calendar
                  className={`${
                    expired ? "text-blue-200" : "text-blue-500"
                  } h-5 w-5`}
                />{" "}
                <span className="font-semibold">Appointment On:</span>
                {moment(item.attributes.date).format("MMMM Do YYYY")}{" "}
              </h2>
              <h2
                className={
                  expired ? "flex gap-2 text-gray-500" : "flex gap-2 text-black"
                }
              >
                <Clock
                  className={`${
                    expired ? "text-blue-200" : "text-blue-500"
                  } h-5 w-5`}
                />{" "}
                At Time :{item.attributes.time}
              </h2>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BookingList;
