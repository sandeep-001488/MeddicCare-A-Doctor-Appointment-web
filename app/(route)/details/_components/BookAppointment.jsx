import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";
import moment from "moment/moment";

const BookAppointment = ({ doctorData }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [note, setNote] = useState("");
  const { user } = useKindeBrowserClient();

  const [openDialog, setOpenDialog] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());
  // const [isLessThanCurrentTime,setIsLessThanCurrentTime]=useState(false)

  const convertTo24HourFormat = (time) => {
    const [timePart, modifier] = time.split(" "); // Split into time and AM/PM
    let [hours, minutes] = timePart.split(":").map(Number); // Split hours and minutes

    // Convert based on AM/PM
    if (modifier === "PM" && hours < 12) {
      hours += 12; // Convert PM hours
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0; // Handle midnight case
    }

    // Return time in HH:mm format
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  // console.log(moment(currentTime).format("HH:mm"));
  

  const savedBooking = () => {
    const data = {
      data: {
        username: user.given_name + " " + user.family_name,
        email: user?.email,
        time: selectedTimeSlot,
        date: date,
        doctor: doctorData.id,
        note: note,
      },
    };

    GlobalApi.bookAppointment(data).then((res) => {
      if (res) {
        GlobalApi.sendEmail(data).then(() => {
          toast("Booking confirmation will be sent on your email", {
            style: {
              backgroundColor: "blue",
              color: "white",
            },
          });
        });

        setNote("");
        setOpenDialog(false);
      }
    });
  };

  const isPastDay = (day) => {
    return day <= new Date();
  };

  useEffect(() => {
    getTime();
  }, []);

  // const getTime = () => {
  //   const timeList = [];
  //   for (let i = 10; i <= 12; i++) {

  //     timeList.push({
  //       time: i + ":00 AM",
  //     });
      
  //     timeList.push({
  //       time: i + ":30 AM",
  //     });
  //   }

  //   for (let i = 1; i <= 6; i++) {
  //     timeList.push({
  //       time: i + ":00 PM",
  //     });
  //     timeList.push({
  //       time: i + ":30 PM",
  //     });
  //   }
  //   setTimeSlot(timeList);
  // };

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 11; i++) {
      const time1 = convertTo24HourFormat(i + ":00 AM");
      const time2 = convertTo24HourFormat(i + ":30 AM");

      timeList.push({
        time: time1,
        displayTime: i + ":00 AM",
      });
      timeList.push({
        time: time2,
        displayTime: i + ":30 AM",
      });
    }
    
     for (let i = 12; i <= 12; i++) {
       const time1 = convertTo24HourFormat(i + ":00 PM");
       const time2 = convertTo24HourFormat(i + ":30 PM");

       timeList.push({
         time: time1,
         displayTime: i + ":00 PM",
       });
       timeList.push({
         time: time2,
         displayTime: i + ":30 PM",
       });
     }

    for (let i = 1; i <= 6; i++) {
      const time1 = convertTo24HourFormat(i + ":00 PM");
      const time2 = convertTo24HourFormat(i + ":30 PM");

      timeList.push({
        time: time1,
        displayTime: i + ":00 PM",
      });
      timeList.push({
        time: time2,
        displayTime: i + ":30 PM",
      });
    }
    setTimeSlot(timeList);
  };


  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <Button
          className="mt-3 rounded-full bg-blue-500 hover:bg-red-600"
          onClick={() => setOpenDialog(true)}
        >
          Book Appointment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Slot..</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
                {/* calendar */}
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className="flex gap-2 items-center">
                    <CalendarDays className="text-blue-500 h-5 w-5" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className={`rounded-md border`}
                  />
                </div>
                {/* time slot */}
                <div className="mt-3 md:mt-0">
                  <h2 className="flex gap-2 items-center mb-5">
                    <Clock className="text-blue-500 h-5 w-5" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-3 border rounded-lg p-5 mt-1">
                    {/* {timeSlot?.map((item, index) => (
                      <h2
                        key={index}
                        className={`p-2 border rounded-full text-center hover:bg-blue-500 hover:text-white cursor-pointer ${
                          item.time === selectedTimeSlot
                            ? "bg-blue-500 text-white"
                            : ""
                        }`}
                        onClick={() => setSelectedTimeSlot(item.time)}
                      >
                        {item.time}
                      </h2>
                    ))} */}
                    {timeSlot?.map((item, index) => {
                      const isDisabled =
                        moment(currentTime).format("HH:mm") > item.time; // Compare current time

                      return (
                        <h2
                          key={index}
                          className={`p-2 border rounded-full text-center cursor-pointer ${
                            item.time === selectedTimeSlot
                              ? "bg-blue-500 text-white"
                              : ""
                          } ${
                            isDisabled
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-blue-500 hover:text-white"
                          }`}
                          onClick={() =>
                            !isDisabled && setSelectedTimeSlot(item.time)
                          }
                        >
                          {item.displayTime}
                        </h2>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <textarea
          className="border-[1px] border-blue-500 h-[60px] p-1 w-full resize-none"
          placeholder="Any message..."
          rows="8"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <>
              <Button
                type="button"
                variant="outline"
                className="text-red-500 border-red-500 cursor-pointer"
              >
                Close
              </Button>
              <Button
                type="button"
                className="bg-blue-500"
                disabled={!(date && selectedTimeSlot)}
                onClick={savedBooking}
              >
                Submit
              </Button>
            </>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
