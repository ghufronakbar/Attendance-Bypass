"use client";

import ButtonRed from "@/components/ButtonRed";
import { Table, TBody, Td, Th, THead, Tr, Trh } from "@/components/Table";
import formatDate from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useToast } from "@/components/Toast";
import getHistory from "@/services/getHistory";
import { History } from "@/models/History";
import deleteHistory from "@/services/deleteHistory";
import ButtonBlue from "@/components/ButtonBlue";
import { HiEye } from "react-icons/hi";
import Modal from "@/components/Modal";
import QRCode from "react-qr-code";

interface SelectedItem {
  name: string;
  week: number;
  code: string;
}

const HistoryPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [histories, setHistories] = useState<History[]>([]);
  const [trigger, setTrigger] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const { showToast } = useToast();
  useEffect(() => {
    setHistories(getHistory());
  }, [trigger]);

  const handleDelete = (code: string) => {
    deleteHistory(code);
    showToast("History Deleted", "info");
    setTrigger(trigger + 1);
  };

  const isNotExpired = (createdAt: string, expiredTime: number): boolean => {
    const createdAtDate = new Date(createdAt);
    const expirationTime = expiredTime * 60 * 1000; // Mengonversi menit ke milidetik
    const currentTime = new Date().getTime();
    const expirationDate = createdAtDate.getTime() + expirationTime;
    return currentTime < expirationDate;
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-8">
        <div className="w-full justify-between flex flex-row items-center">
          <h1 className="text-3xl font-bold">History</h1>
        </div>
        <div className="w-full border-2 border-black rounded-md bg-purple-1 p-8 flex flex-col gap-8 overflow-x-scroll hide-scroll">
          <Table>
            <THead>
              <Trh>
                <Th>Course</Th>
                <Th>Week</Th>
                <Th>Created At</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Trh>
            </THead>
            <TBody>
              {histories.length === 0 && (
                <Tr>
                  <Td colSpan={5} className="text-center py-16">
                    No data
                  </Td>
                </Tr>
              )}
              {histories.map((item, index) => (
                <Tr key={index} className="text-center">
                  <Td>{item.name}</Td>
                  <Td>{item.meeting}</Td>
                  <Td>{formatDate(item.createdAt)}</Td>
                  <Td>
                    {isNotExpired(item.createdAt, item.expiredTime)
                      ? "Active"
                      : "Expired"}
                  </Td>
                  <Td className="flex flex-row gap-4 justify-center">
                    <ButtonBlue
                      onClick={() => {
                        setSelectedItem({
                          name: item.name,
                          week: item.meeting,
                          code: item.code,
                        });
                        setShowModal(true);
                      }}
                    >
                      <HiEye />
                    </ButtonBlue>
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
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        title="Show QR Code"
      >
        <div className="w-full h-full flex flex-col p-4">
          {selectedItem?.code && (
            <QRCode value={selectedItem?.code} className="self-center" />
          )}
          <span className="text-lg mt-2 self-center">
            {selectedItem?.name} - Week {selectedItem?.week}
          </span>
        </div>
      </Modal>
    </>
  );
};

export default HistoryPage;
