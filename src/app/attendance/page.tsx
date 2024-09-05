"use client";

import ButtonBlue from "@/components/ButtonBlue";
import DropDownCourse from "@/components/DropDownCourse";
import DropDownWeek from "@/components/DropDownWeek";

const AttendancePage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Do Attendance</h1>
      <div className="w-full border-2 border-black rounded-md bg-[#A5B4FB] p-8 flex flex-col gap-8">
        <div className="w-full flex flex-row gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="course" className="text-lg font-semibold">
              Select Course
            </label>
            <DropDownCourse />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="course" className="text-lg font-semibold">
              Select Week
            </label>
            <DropDownWeek />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="course" className="text-lg font-semibold">
            Expired In (minutes)
          </label>
          <input
            className="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            type="text"
            inputMode="numeric"
            placeholder="60"
            defaultValue={60}
          />
        </div>
        <ButtonBlue>Create Attendance</ButtonBlue>
      </div>
    </div>
  );
};

export default AttendancePage;
