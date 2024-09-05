interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonBlue = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="w-fit h-12 border-black border-2 p-2.5 bg-[#A6FAFF] hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonBlue;
