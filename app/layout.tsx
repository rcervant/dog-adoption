import { Toaster } from "@/components/base/toaster";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fetch Take-Home Exercise",
  description: "Dog Adoption App",
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  if (!children) throw new Error("No children found");
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
