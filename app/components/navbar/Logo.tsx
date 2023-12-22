import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <div className="hidden md:block">
      <Link href="/">
        <div className="flex flex-col items-center w-fit cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="Logo"
            height="30"
            width="30"
            className="object-contain"
          />
          <p className="text-primary font-semibold text-xs">Home Stays</p>
        </div>
      </Link>
    </div>
  );
}

export default Logo;
