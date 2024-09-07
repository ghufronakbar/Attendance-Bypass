interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonGreen = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="w-fit h-12 border-black border-2 p-2.5 bg-green-1 hover:bg-green-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-green-3"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonGreen;
