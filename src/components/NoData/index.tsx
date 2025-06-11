import { BoxOpenIcon } from "@notestack/assets/svg";

const NoDataAvailable = ({ content }: { content: string }) => {
  return (
    <div className="flex flex-col gap-4 h-120 lg:h-full items-center justify-center">
      <BoxOpenIcon />

      <div className="text-md  text-(--primary) font-semibold">{content}</div>
    </div>
  );
};

export default NoDataAvailable;
