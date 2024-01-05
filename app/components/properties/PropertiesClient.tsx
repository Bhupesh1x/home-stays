"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { SafeListings, SafeUser } from "@/app/types";

import Heading from "../shared/Heading";
import Container from "../shared/Container";
import ListingCard from "../listings/ListingCard";

type Props = {
  listings: SafeListings[];
  currUser?: SafeUser | null;
};

function PropertiesClient({ listings, currUser }: Props) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      const notify = toast.loading("Deleting Property...");
      setDeletingId(id);

      console.log("id", id);

      try {
        await axios.delete(`/api/listings/${id}`);
        toast.success("Property Deleted", {
          id: notify,
        });
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data, {
          id: notify,
        });
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subTitle="List of your properties." />

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            currUser={currUser}
            actionId={listing.id}
            actionLabel="Delete Property"
            disabled={deletingId === listing.id}
            onAction={onCancel}
          />
        ))}
      </div>
    </Container>
  );
}

export default PropertiesClient;
