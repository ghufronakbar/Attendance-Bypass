interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonRed = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="w-fit h-12 border-black border-2 p-2.5 bg-[#FFA6F6] hover:bg-[#FA8CEF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#F774EA]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonRed;
