import Image from "next/image";

function Logo() {
  return (
    <div className="hidden md:block">
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
    </div>
  );
}

export default Logo;
