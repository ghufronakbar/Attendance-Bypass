import React from "react";

const Table = ({ children }: { children: React.ReactNode }) => {
  return <table className="min-w-full">{children}</table>;
};

const THead = ({ children }: { children: React.ReactNode }) => {
  return <thead>{children}</thead>;
};

const TBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

const Tr = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <tr className={className + "  border-b-2 border-black"}>
      {children}
    </tr>
  );
};
const Trh = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <tr className={className + " text-center border-b-4 border-black"}>
      {children}
    </tr>
  );
};

const Th = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <th className={className + " py-2 px-4"}>{children}</th>;
};

const Td = ({ children, className, colSpan }: { children: React.ReactNode, className?: string, colSpan?: number }) => {
  return <td colSpan={colSpan} className={ className + " py-2 px-4"}>{children}</td>;
};

export { Table, THead, TBody, Tr, Td, Th, Trh };
