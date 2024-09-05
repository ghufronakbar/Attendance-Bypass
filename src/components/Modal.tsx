interface ModalProps {
  title: string;
  children?: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
  onSubmitText?: string;
  onSubmit?: () => void;
}

const Modal = ({
  title,
  isVisible,
  children,
  onClose,
  onSubmitText,
  onSubmit,
}: ModalProps): JSX.Element => {
  if (!isVisible) return <></>;
  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 xl:w-[40vw] lg:w-[60vw] md:w-[80vw] sm:w-[90vw] w-[95vw] px-4 py-8 bg-white border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] grid place-content-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h1 className="text-2xl mb-4">{title}</h1>
          <div className="w-full py-4">{children}</div>
          {!onSubmitText && 
          <div className="flex space-x-2 mx-auto w-32 mt-8">
            <button className="h-12 border-black border-2 p-2.5 bg-blue-1 hover:bg-blue-2 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-blue-3 rounded-full mx-auto" onClick={onClose}>
              Close
            </button>
            </div>
          }
            {onSubmitText && (
              <div className="flex space-x-2 mx-auto w-32 mt-8">
               <button className="text-base mx-auto" onClick={onClose}>
               Close
             </button>
              <button
                className="h-12 border-black border-2 p-2.5 bg-blue-1 hover:bg-blue-2 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-blue-3 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  onSubmit && onSubmit();
                }}
              >
                {onSubmitText}
              </button>
            </div>
            )}
          
        </div>
      </div>
    </div>
  );
};

export default Modal;
