import getCurrentUser from "@/actions/getCurrentUser";
import { SEARCH_PATH, SIGN_IN_PATH } from "@/lib/constants";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Home = async () => {
  const currentUser = (await getCurrentUser()) || null;

  if (!currentUser) {
    return redirect(SIGN_IN_PATH);
  }

  return redirect(SEARCH_PATH);
};

export default Home;
