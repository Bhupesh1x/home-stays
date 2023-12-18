import Image from "next/image";

function Avatar() {
  return (
    <Image
      src="/images/placeholder.jpg"
      alt="avatar"
      height="30"
      width="30"
      className="rounded-full"
    />
  );
}

export default Avatar;
