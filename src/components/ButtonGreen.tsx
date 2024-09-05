interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonGreen = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      className="w-fit h-12 border-black border-2 p-2.5 bg-[#c6fab4] hover:bg-[#B8FF9F] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#9dfc7c]"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonGreen;
