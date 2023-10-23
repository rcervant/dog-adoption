import ButtonSkeleton from "../ButtonSkeleton";
import InputSkeleton from "../InputSkeleton";
import LabelSkeleton from "../LabelSkeleton";
import { Skeleton } from "@/components/base/skeleton";

const SignInFormSkeleton = () => {
  return (
    <div>
      <div className="z-50 flex flex-1 grow items-center justify-items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 h-full w-full p-2 md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
          <div className="text-2xl font-semibold">
            <Skeleton className="h-6 w-[200px]" />
          </div>
        </div>
        <div className="relative p-6 ">
          <div>
            <div>
              <div className="pb-4">
                <LabelSkeleton />
                <div>
                  <InputSkeleton />
                </div>
                <div />
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="pt-4">
                <LabelSkeleton />
                <div>
                  <InputSkeleton />
                </div>
                <div />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-6">
          <div className="flex w-full flex-col items-center gap-4">
            <ButtonSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInFormSkeleton;
