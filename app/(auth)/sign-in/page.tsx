import AuthTab from "../_components/AuthTab";

const SignInPage = async () => {
  return (
    <>
      <div className="z-50 flex flex-1 grow items-center justify-items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="mx-auto my-6 flex h-full w-full justify-center p-2">
          <AuthTab />
        </div>
      </div>
    </>
  );
};

export default SignInPage;
