"use client";

import ButtonGreen from "@/components/ButtonGreen";
import ButtonRed from "@/components/ButtonRed";
import Modal from "@/components/Modal";
import { Table, TBody, Td, Th, THead, Tr, Trh } from "@/components/Table";
import formatDate from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import getCourse from "../../services/getCourse";
import { Course } from "@/models/Course";
import addCourse, { AddCourse } from "../../services/addCourse";
import deleteCourse from "../../services/deleteCourse";
import { useToast } from "@/components/Toast";

const CoursePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [trigger, setTrigger] = useState<number>(0);
  const { showToast } = useToast();
  const [formCourse, setFormCourse] = useState<AddCourse>({
    name: "",
    encrypted: "",
  });

  useEffect(() => {
    setCourses(getCourse());
  }, [isOpen, trigger]);

  const handleAdd = async () => {    
    if (formCourse.name === "" || formCourse.encrypted === "") return showToast("Please fill all fields", "info");    
    try {
      const newCourse = await addCourse(formCourse);
      if(newCourse instanceof Error) return showToast(newCourse.message, "error");
      setFormCourse({
        name: "",
        encrypted: "",
      });
      showToast("Course Added", "success");
    } catch (error) {
      showToast("Failed to add course", "error");
      console.log(error);
    }
    setIsOpen(false);
  };

  const handleDelete = (code: string) => {
    deleteCourse(code);
    showToast("Course Deleted", "info");
    setTrigger(trigger + 1);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-8">
        <div className="w-full justify-between flex flex-col md:flex-row gap-4 md:gap-0">
          <h1 className="text-3xl font-bold">Manage Course</h1>
          <ButtonGreen onClick={() => setIsOpen(true)}>
            <div className="flex flex-row gap-2 items-center">
              <IoAddOutline /> Add Course
            </div>
          </ButtonGreen>
        </div>
        <div className="w-full h-fit border-2 border-black rounded-md bg-purple-1 p-8 flex flex-col gap-8 overflow-x-auto hide-scroll">        
          <Table>
            <THead>
              <Trh>
                <Th>Course</Th>
                <Th>Code</Th>
                <Th>Created At</Th>
                <Th>Action</Th>
              </Trh>
            </THead>
            <TBody>
              {courses.length === 0 && (
                <Tr>
                  <Td colSpan={4} className="text-center py-16">
                    No data
                  </Td>
                </Tr>
              )}
              {courses.map((item) => (
                <Tr key={item.code} className="text-center">
                  <Td>{item.name}</Td>
                  <Td>{item.code}</Td>
                  <Td>{formatDate(item.createdAt)}</Td>
                  <Td>
                    <ButtonRed
                      onClick={() => {
                        handleDelete(item.code);
                      }}
                    >
                      <RiDeleteBin6Fill />
                    </ButtonRed>
                  </Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </div>
      </div>
      <Modal
        isVisible={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        title="Add Course"
        onSubmitText="Add"
        onSubmit={() => handleAdd()}
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="name" className="text-lg font-semibold">
              Course Name
            </label>
            <input
              className="w-full border-black border-2 p-2.5 focus:outline-none shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-violet-1 active:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              type="text"
              placeholder="Object Oriented Programming"
              value={formCourse.name}
              onChange={(e) =>
                setFormCourse({ ...formCourse, name: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="code" className="text-lg font-semibold">
              Encyrpted Code
            </label>
            <input
              className="w-full border-black border-2 p-2.5 focus:outline-none shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-violet-1 active:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
              type="text"
              placeholder="U2FsdGVkX18NSX+RL7twPs/HhWOntnmYb7HpRyJ9Fy2ZHMNPVflwKd5hWK5KrT1v"
              value={formCourse.encrypted}
              onChange={(e) =>
                setFormCourse({ ...formCourse, encrypted: e.target.value })
              }
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CoursePage;
