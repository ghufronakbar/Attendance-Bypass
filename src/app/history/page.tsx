"use client";

import ButtonRed from "@/components/ButtonRed";
import { Table, TBody, Td, Th, THead, Tr, Trh } from "@/components/Table";
import formatDate from "@/utils/formatDate";
import { useEffect, useState } from "react";
import { RiDeleteBin6Fill, RiFileCopy2Fill } from "react-icons/ri";
import { useToast } from "@/components/Toast";
import getHistory from "@/services/getHistory";
import { History } from "@/models/History";
import deleteHistory from "@/services/deleteHistory";
import ButtonBlue from "@/components/ButtonBlue";
import { HiEye } from "react-icons/hi";
import ButtonGreen from "@/components/ButtonGreen";
import copyToClipboard from "@/utils/copyToClipboard";
import ModalQR from "@/components/ModalQR";
import Modal from "@/components/Modal";
import deleteAllHistories from "@/services/deleteAllHistories";

interface SelectedItem {
  name: string;
  week: number;
  code: string;
}

const HistoryPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
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
    const expirationTime = expiredTime * 60 * 1000;
    const currentTime = new Date().getTime();
    const expirationDate = createdAtDate.getTime() + expirationTime;
    return currentTime < expirationDate;
  };

  const handleDeleteAll = () => {
    if (histories.length === 0) {
      setShowConfirm(false);
      return showToast("No History Found", "info");
    }
    deleteAllHistories();
    showToast(`${histories.length} History Has Been Deleted`, "info");
    setTrigger(trigger + 1);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col gap-8">
        <div className="w-full justify-between flex flex-row">
          <h1 className="text-3xl font-bold">History</h1>
          <ButtonRed
            onClick={() => {
              setShowConfirm(true);
            }}
          >
            <div className="flex flex-row gap-2 items-center">
              <RiDeleteBin6Fill /> Clear All
            </div>
          </ButtonRed>
        </div>
        <div className="w-full border-2 border-black rounded-md bg-purple-1 p-8 flex flex-col gap-8 overflow-x-auto">
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
                  <Td className="flex flex-row gap-2 justify-center">
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
                    <ButtonGreen
                      onClick={() => {
                        copyToClipboard(item.code);
                        showToast("Copied to clipboard", "info");
                      }}
                    >
                      <RiFileCopy2Fill />
                    </ButtonGreen>
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
      <ModalQR
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        code={selectedItem?.code || ""}
        courseName={selectedItem?.name || ""}
        title={"Show QR Code"}
        week={selectedItem?.week || 0}
      />
      <Modal
        isVisible={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Delete Confirmation"
        onSubmitText="Delete"
        onSubmit={() => {
          handleDeleteAll();
        }}
      >
        <p className="text-center">
          Are you sure you want to delete this history?
        </p>
      </Modal>
    </>
  );
};

export default HistoryPage;
