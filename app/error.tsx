"use client";

import { useEffect } from "react";
import EmptyState from "./components/shared/EmptyState";

type Props = {
  error: Error;
};

const Error: React.FC<Props> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Oh!" subTitle="Something went wrong!" />;
};

export default Error;
