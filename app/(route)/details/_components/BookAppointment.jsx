// import React, { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarDays, Clock } from "lucide-react";
// import { DialogClose } from "@radix-ui/react-dialog";
// import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import GlobalApi from "@/app/_utils/GlobalApi";
// import { toast } from "sonner";

// const BookAppointment = ({ doctorData }) => {
//   const [date, setDate] = useState(new Date());

//   const [timeSlot, setTimeSlot] = useState([]);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState();
//   // const [isBookingConfirmed,setIsBookingConfirmed]=useState(false)

//   const [note, setNote] = useState("");
//   const { user } = useKindeBrowserClient();

//   const savedBooking = () => {
//     const data = {
//       data: {
//         username: user.given_name + " " + user.family_name,
//         email: user.email,
//         time: selectedTimeSlot,
//         date: date,
//         doctor: doctorData.id,
//         note: note,
//       },
//     };
//     GlobalApi.bookAppointment(data).then((res) => {
//       console.log("response",res);
//       if(res){
//         toast("Booking confirmation will be sent on your email")
//         setIsBookingConfirmed(true)
//         setNote("")
//       }
//     });
//   };

//   const isPastDay = (day) => {
//     return day <= new Date();
//   };

//   useEffect(() => {
//     getTime();
//   }, []);

//   const getTime = () => {
//     const timeList = [];
//     for (let i = 10; i <= 12; i++) {
//       timeList.push({
//         time: i + ":00 AM",
//       });
//       timeList.push({
//         time: i + ":30 AM",
//       });
//     }

//     for (let i = 1; i <= 6; i++) {
//       timeList.push({
//         time: i + ":00 PM",
//       });
//       timeList.push({
//         time: i + ":30 PM",
//       });
//     }
//     setTimeSlot(timeList);
//   };

//   return (
//     <Dialog>
//       <DialogTrigger>
//         <Button className="mt-3 rounded-full bg-blue-500 hover:bg-red-600">
//           Book Appointment
//         </Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Book Slot..</DialogTitle>
//           <DialogDescription>
//             <div>
//               <div className="grid grid-cols-1 md:grid-cols-2 mt-5">
//                 {/* calendar */}
//                 <div className="flex flex-col gap-3 items-baseline">
//                   <h2 className="flex gap-2 items-center">
//                     <CalendarDays className="text-blue-500 h-5 w-5" />
//                     Select Date
//                   </h2>
//                   <Calendar
//                     mode="single"
//                     selected={date}
//                     onSelect={setDate}
//                     disabled={isPastDay}
//                     className={`rounded-md border`}
//                   />
//                 </div>
//                 {/* time slot */}
//                 <div className="mt-3 md:mt-0">
//                   <h2 className="flex gap-2 items-center mb-5">
//                     <Clock className="text-blue-500 h-5 w-5" />
//                     Select Time Slot
//                   </h2>
//                   <div className="grid grid-cols-3 gap-3 border rounded-lg p-5 mt-1">
//                     {timeSlot?.map((item, index) => (
//                       <h2
//                         key={index}
//                         className={`p-2 border rounded-full text-center hover:bg-blue-500 hover:text-white cursor-pointer ${
//                           item.time === selectedTimeSlot
//                             ? "bg-blue-500 text-white"
//                             : ""
//                         }`}
//                         onClick={() => setSelectedTimeSlot(item.time)}
//                       >
//                         {item.time}
//                       </h2>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </DialogDescription>
//         </DialogHeader>
//         <textarea
//           className="border-[1px] border-blue-500 h-[60px] p-1 w-full resize-none"
//           placeholder="Any message..."
//           rows="8"
//           onChange={(e) => setNote(e.target.value)}
//         />
//         <DialogFooter className="sm:justify-end">
//           <DialogClose asChild>
//             <>
//               <Button
//                 asChild
//                 type="button"
//                 variant="outline"
//                 className="text-red-500 border-red-500 cursor-pointer"
//               >
//                 <span>Close</span>
//               </Button>
//               <Button
//                 type="button"
//                 className="bg-blue-500"
//                 disabled={!(date && selectedTimeSlot)}
//                 onClick={()=>savedBooking()}
//               >
//                 Submit
//               </Button>
//             </>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default BookAppointment;

import React, { useEffect, useState } from "react";
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

const BookAppointment = ({ doctorData }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [note, setNote] = useState("");
  const { user } = useKindeBrowserClient();

  const [openDialog, setOpenDialog] = useState(false);

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
      // console.log("response", res);
      if (res) {
        GlobalApi.sendEmail(data).then((res) => {
          // console.log(res);
        });
        toast("Booking confirmation will be sent on your email", {
          style: {
            backgroundColor: "blue",
            color: "white",
          },
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

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }

    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
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
                    {timeSlot?.map((item, index) => (
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
                    ))}
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
