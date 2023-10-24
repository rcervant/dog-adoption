"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      className="cursor-pointer md:block"
      src="/images/logo.webp"
      alt="logo"
      width={50}
      height={50}
      onClick={() => router.push("/")}
      priority={true}
      sizes="100%"
    />
  );
};

export default Logo;
