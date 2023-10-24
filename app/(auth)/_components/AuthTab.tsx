import { REGISTER, SIGN_IN } from "@/lib/constants";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/base/tabs";
import SignInForm from "./SignInForm";

const AuthTab = () => {
  return (
    <Tabs defaultValue={SIGN_IN} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={SIGN_IN}>Sign In</TabsTrigger>
        <TabsTrigger value={REGISTER}>Register</TabsTrigger>
      </TabsList>
      <TabsContent value={SIGN_IN}>
        <SignInForm value={SIGN_IN} />
      </TabsContent>
      <TabsContent value={REGISTER}>
        <SignInForm value={REGISTER} />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTab;
