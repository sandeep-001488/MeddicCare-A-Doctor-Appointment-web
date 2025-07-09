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
import moment from "moment/moment";

const BookAppointment = ({ doctorData }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [note, setNote] = useState("");
  const { user } = useKindeBrowserClient();

  const [openDialog, setOpenDialog] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const getTime = () => {
    const timeList = [];

    for (let hour = 10; hour <= 18; hour++) {
      for (let minute of [0, 30]) {
        const time = moment({ hour, minute });
        timeList.push({
          time: time.format("HH:mm"),
          displayTime: time.format("h:mm A"),
        });
      }
    }

    setTimeSlot(timeList);

    const currentTimeStr = moment().format("HH:mm");
    const hasFutureSlotToday = timeList.some(
      (item) => item.time > currentTimeStr
    );
    setDate(hasFutureSlotToday ? new Date() : moment().add(1, "day").toDate());
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
                    {timeSlot?.map((item, index) => {
                      const isSameDay = moment(date).isSame(new Date(), "day");
                      const isPastTime =
                        isSameDay &&
                        moment(currentTime).format("HH:mm") > item.time;

                      let isOutsideDoctorTime = false;

                      if (
                        doctorData?.attributes?.start_time &&
                        doctorData?.attributes?.end_time
                      ) {
                        let doctorStart = moment(
                          doctorData.attributes.start_time,
                          "HH:mm:ss"
                        );
                        let doctorEnd = moment(
                          doctorData.attributes.end_time,
                          "HH:mm:ss"
                        );

                        if (doctorEnd.isBefore(doctorStart)) {
                          const endHours = doctorEnd.hours();
                          if (endHours < 12) {
                            doctorEnd = doctorEnd.add(12, "hours");
                          }
                        }

                        const slotTime = moment(item.time, "HH:mm");

                        isOutsideDoctorTime =
                          slotTime.isBefore(doctorStart) ||
                          slotTime.isAfter(doctorEnd);
                      }

                      const isDisabled = isPastTime || isOutsideDoctorTime;

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
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="text-red-500 border-red-500 cursor-pointer w-full sm:w-auto"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            className="bg-blue-500 w-full sm:w-auto"
            disabled={!(date && selectedTimeSlot)}
            onClick={savedBooking}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointment;
