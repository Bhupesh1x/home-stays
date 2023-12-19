"use client";

import { useState, useEffect } from "react";

function ClientComponent({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <div>{children}</div>;
}

export default ClientComponent;
