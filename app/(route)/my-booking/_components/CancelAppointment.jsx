import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const CancelAppointment = ({onContinueClick}) => {
    
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="outline" className="text-red-500 border-red-500">
          Cancel Appointment
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-200 !important">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-blue-700">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            This action cannot be undone. This will permanently delete your
            appointment and <span className="text-green-600"> 𝓎𝑜𝓊 𝓌𝒾𝓁𝓁 𝓊𝓃𝒶𝒷𝓁𝑒 𝓉𝑜 𝒻𝒾𝓃𝒹 𝒾𝓉 𝒶𝑔𝒶𝒾𝓃..</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:border-blue-500 hover:text-blue-700">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>onContinueClick()} className="hover:bg-red-700" >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CancelAppointment;
