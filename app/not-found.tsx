import EmptyState from "@/components/EmptyState";
import BareBonesNavBar from "@/app/(main)/_components/Navbar/BareBonesNavBar";

export default function NotFound() {
  return (
    <>
      <BareBonesNavBar />
      <EmptyState
        title="Not Found"
        subtitle="Could not find requested resource"
        sendHome={true}
      />
    </>
  );
}
