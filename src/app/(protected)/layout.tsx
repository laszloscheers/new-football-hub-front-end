interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => { 
  return (
    <div className="full-height w-full flex flex-col gap-y-10 items-center justify-center">
      {children}
    </div>
  );
}

export default ProtectedLayout;