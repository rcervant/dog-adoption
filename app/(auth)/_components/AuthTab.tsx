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
    <Tabs defaultValue={REGISTER} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value={REGISTER}>Register</TabsTrigger>
        <TabsTrigger value={SIGN_IN}>Sign In</TabsTrigger>
      </TabsList>
      <TabsContent value={REGISTER}>
        <SignInForm value={REGISTER} />
      </TabsContent>
      <TabsContent value={SIGN_IN}>
        <SignInForm value={SIGN_IN} />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTab;
