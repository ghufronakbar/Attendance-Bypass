interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonBlue = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="w-fit h-12 border-black border-2 p-2.5 bg-blue-1 hover:bg-blue-2 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-blue-3"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonBlue;
