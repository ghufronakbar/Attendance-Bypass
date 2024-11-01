"use client";

import ButtonBlue from "@/components/ButtonBlue";
import DropDownCourse from "@/components/DropDownCourse";
import DropDownWeek from "@/components/DropDownWeek";
import { useEffect, useState } from "react";
import getCourse from "../../services/getCourse";
import { Course } from "@/models/Course";
import { useToast } from "@/components/Toast";
import { getPresenceCode } from "../../services/getPresenceCode";
import addHistory from "@/services/addHistory";
import ModalQR from "@/components/ModalQR";

const AttendancePage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [expiredIn, setExpiredIn] = useState<number>(9999);
  const [isSelectWeek, setIsSelectWeek] = useState<boolean>(false);
  const [selectedWeek, setSelectedWeek] = useState<number>(0);
  const [isSelectCourse, setIsSelectCourse] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course>({
    name: "Select Course",
    code: "",
    createdAt: "",
  });
  const { showToast } = useToast();
  const handleSelectWeek = (selected: number) => {
    setIsSelectWeek(!isSelectWeek);
    setSelectedWeek(selected);
  };

  const handleSelectCourse = (selected: Course) => {
    setIsSelectCourse(!isSelectCourse);
    setSelectedCourse(selected);
  };

  const handleGenerate = async () => {
    if (selectedCourse.code === "")
      return showToast("Please select course", "info");
    if (selectedWeek === 0) return showToast("Please select week", "info");
    if (expiredIn === 0)
      return showToast("Expired in must be more than 0", "info");
    const getQr = await getPresenceCode(selectedCourse.code, selectedWeek);
    if (getQr instanceof Error) return showToast(getQr.message, "error");
    const addToHistory = await addHistory({
      name: selectedCourse.name,
      code: getQr,
      meeting: selectedWeek,
      createdAt: new Date().toISOString(),
      expiredTime: expiredIn,
    });
    if (addToHistory instanceof Error)
      return showToast(addToHistory.message, "error");
    setCode(getQr);
    setShowModal(true);
    showToast("Generating attendance", "success");
  };

  useEffect(() => {
    setCourses(getCourse());
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col gap-8">
        <h1 className="text-3xl font-bold">Do Attendance</h1>
        <div className="w-full border-2 border-black rounded-md bg-purple-1 p-8 flex flex-col gap-8 justify-center">
          <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center">
            <div className="flex flex-col gap-2 ">
              <label htmlFor="course" className="text-lg font-semibold">
                Select Course
              </label>
              <DropDownCourse
                courses={courses}
                open={isSelectCourse}
                setSelected={(selected: Course) => handleSelectCourse(selected)}
                setOpen={() => setIsSelectCourse(!isSelectCourse)}
                selected={selectedCourse}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="course" className="text-lg font-semibold">
                Select Week
              </label>
              <DropDownWeek
                open={isSelectWeek}
                selected={selectedWeek}
                setOpen={() => setIsSelectWeek(!isSelectWeek)}
                setSelected={(selected: number) => handleSelectWeek(selected)}
                weeks={Array.from({ length: 14 }, (_, i) => i + 1)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-full flex flex-col gap-2  items-center">
              <label htmlFor="course" className="text-lg font-semibold">
                Expired In (minutes)
              </label>
              <input
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-11 border-black border-2 p-2.5 focus:outline-none shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-violet-1 "
                type="number"
                inputMode="numeric"
                placeholder="60"
                value={expiredIn}
                disabled
                onChange={(e) => setExpiredIn(Number(e.target.value))}
              />
            </div>
          </div>
          <ButtonBlue
            onClick={() => {
              handleGenerate();
            }}
            className="self-center"
          >
            Create Attendance
          </ButtonBlue>
        </div>
      </div>
      <ModalQR
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        courseName={selectedCourse.name}
        title={`Attendance for ${selectedCourse.name} - Week ${selectedWeek}`}
        week={selectedWeek}
        code={code}
      />
    </>
  );
};

export default AttendancePage;
