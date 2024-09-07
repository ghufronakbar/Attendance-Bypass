import QRCode from "react-qr-code";
import Modal from "./Modal";
import copyToClipboard from "@/utils/copyToClipboard";
import ButtonGreen from "./ButtonGreen";
import { RiFileCopy2Fill } from "react-icons/ri";
import { useToast } from "./Toast";

interface ModalQRProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  courseName: string;
  week: number;
  code: string;
}

const ModalQR = ({
  isVisible,
  onClose,  
  courseName,
  week,
  code,
}: ModalQRProps) => {
  const { showToast } = useToast();
  return (
    <Modal isVisible={isVisible} onClose={onClose} title={`Attendance for ${courseName} - Week ${week}`}>
      <div className="w-full h-full flex flex-col p-4">
        <QRCode value={code} className="self-center w-full" />
        <div className="flex flex-row gap-2 w-full mt-4">
          <input
            className="w-full border-black border-2 p-2.5 focus:outline-none shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] focus:bg-violet-1 active:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            type="text"
            placeholder="Object Oriented Programming"
            value={code}
            disabled
            onClick={() => {
              copyToClipboard(code);
              showToast("Copied to clipboard", "info");
            }}
          />
          <ButtonGreen
            onClick={() => {
              copyToClipboard(code);
              showToast("Copied to clipboard", "info");
            }}
          >
            <RiFileCopy2Fill />
          </ButtonGreen>
        </div>      
      </div>
    </Modal>
  );
};

export default ModalQR;
