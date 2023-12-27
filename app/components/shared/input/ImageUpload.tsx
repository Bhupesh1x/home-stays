import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function ImageUpload({ value, onChange }: Props) {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result?.info?.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      uploadPreset="wxrqpnew"
      onUpload={handleUpload}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="h-[350px] w-full flex items-center justify-center border-2 border-dashed border-neutral-300 hover:opacity-80 transition relative cursor-pointer gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <p className="font-semibold text-lg">Click to upload</p>
            {value && (
              <div className="absolute inset-0 h-full w-full">
                <Image fill src={value} alt="upload" className="object-cover" />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

export default ImageUpload;
