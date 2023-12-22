"use client";

import qs from "query-string";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  label: string;
  icon: JSX.Element;
  selected?: boolean;
};

function CategoryBox({ label, icon, selected }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const onClick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery?.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected
          ? "text-neutral-800 border-b-neutral-800"
          : "text-neutral-500 border-transparent"
      }`}
      onClick={onClick}
    >
      {icon}
      <div className="text-sm font-medium">
        <p>{label}</p>
      </div>
    </div>
  );
}

export default CategoryBox;
