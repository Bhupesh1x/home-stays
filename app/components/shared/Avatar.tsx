import Image from "next/image";

type Props = {
  src?: string | null | undefined;
};

function Avatar({ src }: Props) {
  return (
    <Image
      src={src || "/images/placeholder.jpg"}
      alt="avatar"
      height="30"
      width="30"
      className="rounded-full"
    />
  );
}

export default Avatar;
