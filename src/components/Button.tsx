import { cn } from "@/app/lib/utils";

const Button = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 rounded-full bg-blue-500 px-3 py-3 font-semibold text-white transition-colors hover:bg-blue-600 active:bg-blue-600 disabled:bg-gray-200",
        className,
      )}
      {...props}
    />
  );
};

export default Button;
