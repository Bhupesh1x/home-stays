"use client";

import { PuffLoader } from "react-spinners";

function Loader() {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center">
      <PuffLoader size={100} color="#2E9FE2" />
    </div>
  );
}

export default Loader;
