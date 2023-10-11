import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  if (!children) throw new Error("No children found");
  return (
    <main className="fetch-mesh flex h-screen items-center">{children}</main>
  );
};

export default AuthLayout;
