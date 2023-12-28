"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";

type Props = {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
};

function EmptyState({
  title = "No exact matches",
  subTitle = "Try changing or removing some of your filters",
  showReset,
}: Props) {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-2">
      <Heading title={title} subTitle={subTitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
}

export default EmptyState;
