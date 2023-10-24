import getCurrentUser from "@/actions/getCurrentUser";
import { SEARCH_PATH, SIGN_IN_PATH } from "@/lib/constants";
import { redirect } from "next/navigation";

const Home = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect(SIGN_IN_PATH);
  }

  return redirect(SEARCH_PATH);
};

export default Home;
