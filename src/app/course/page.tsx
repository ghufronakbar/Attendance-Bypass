"use client";

import ButtonGreen from "@/components/ButtonGreen";
import ButtonRed from "@/components/ButtonRed";
import Modal from "@/components/Modal";
import { Table, TBody, Td, Th, THead, Tr, Trh } from "@/components/Table";
import formatDate from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { RiDeleteBin6Fill } from "react-icons/ri";
import getCourse from "../services/getCourse";
import { Course } from "@/models/Course";
import addCourse, { AddCourse } from "../services/addCourse";
import deleteCourse from "../services/deleteCourse";

const CoursePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [trigger, setTrigger] = useState<number>(0);
  const [formCourse, setFormCourse] = useState<AddCourse>({
    name: "",
    encrypted: "",
  });
  
  useEffect(() => {
    setCourses(getCourse());
  }, [isOpen, trigger]);

  const handleAdd = () => {
    if (formCourse.name === "" || formCourse.encrypted === "") return;
    if (courses.some((item) => item.name === formCourse.name)) return;
    try {
        addCourse(formCourse);
        setFormCourse({
          name: "",
          encrypted: "",
        });
    } catch (error) {
        console.log(error);        
    }
    setIsOpen(false);
  };

  const handleDelete = (code: string) => {
    deleteCourse(code);
    setTrigger(trigger + 1);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-8">
        <div className="w-full justify-between flex flex-row items-center">
          <h1 className="text-3xl font-bold">Manage Course</h1>
          <ButtonGreen onClick={() => setIsOpen(true)}>
            <div className="flex flex-row gap-2 items-center">
              <IoAddOutline /> Add Course
            </div>
          </ButtonGreen>
        </div>
        <div className="w-full border-2 border-black rounded-md bg-[#A5B4FB] p-8 flex flex-col gap-8">
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
                    <ButtonRed onClick={()=>{handleDelete(item.code)}}>
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
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-lg font-semibold">
              Course Name
            </label>
            <input
              className="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
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
              className="w-96 border-black border-2 p-2.5 focus:outline-none focus:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-[#FFA6F6] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
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