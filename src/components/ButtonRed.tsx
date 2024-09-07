interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonRed = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="w-fit h-12 border-black border-2 p-2.5 bg-violet-1 hover:bg-violet-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-violet-3"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonRed;
