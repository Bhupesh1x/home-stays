import getCurrUser from "@/app/actions/getCurrentUser";
import { getListings } from "@/app/actions/getListings";

import EmptyState from "@/app/components/shared/EmptyState";
import PropertiesClient from "@/app/components/properties/PropertiesClient";

async function PropertiesPage() {
  const currUser = await getCurrUser();

  if (!currUser) {
    return (
      <EmptyState title="Unauthorized" subTitle="Please login to continue." />
    );
  }

  const listings = await getListings({ userId: currUser.id });

  if (!listings.length) {
    return (
      <EmptyState
        title="No properties found"
        subTitle="Looks like you have no properties."
      />
    );
  }

  return <PropertiesClient listings={listings} currUser={currUser} />;
}

export default PropertiesPage;
