import getCurrentUser from "@/actions/getCurrentUser";
import { SEARCH_PATH, SIGN_IN_PATH } from "@/lib/constants";
import { redirect } from "next/navigation";

const Home = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect(SIGN_IN_PATH);
  }

  redirect(SEARCH_PATH);
};

export default Home;
