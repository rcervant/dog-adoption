import SignInFormSkeleton from "@/components/skeletons/AuthPage/SignInFormSkeleton";

const AuthPageLoadingSkeleton = () => {
  return (
    <div className="inset-0 z-50 flex items-center justify-center">
      <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
        <SignInFormSkeleton />
      </div>
    </div>
  );
};

export default AuthPageLoadingSkeleton;
{
  /* <div></div>
);
} */
}
