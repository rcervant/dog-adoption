import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import getFavoriteDogs from "@/actions/getFavoriteDogs";
import FavoriteDogs from "@/components/Dogs/FavoriteDogs";
import { SIGN_IN_PATH } from "@/lib/constants";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const FavoriteDogsPage = async () => {
  const currentUser = (await getCurrentUser()) || null;

  if (!currentUser) {
    <EmptyState title="You have been logged out. Redirecting to sign in" />;
    return redirect(`${process.env.ORIGIN}${SIGN_IN_PATH}`);
  }

  const favoriteDogs = (await getFavoriteDogs()) || null;
  if (!favoriteDogs) throw new Error("No favorite dogs found");

  if (favoriteDogs.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite dogs."
      />
    );
  }

  return <FavoriteDogs favoriteDogs={favoriteDogs} currentUser={currentUser} />;
};

export default FavoriteDogsPage;
