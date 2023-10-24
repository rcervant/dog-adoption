import { Spinner } from "@/components/Spinner";

const Loader = () => {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center ">
      <Spinner size="xlIcon" />
    </div>
  );
};

export default Loader;
