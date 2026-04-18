import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "link";
  size?: "sm" | "md" | "lg" | "xl" | "xxl";
}

const variants = {
  primary:
    "bg-button-gradient text-white rounded-full shadow-[0_0_20px_#00EAFF] hover:shadow-[0_0_28px_#00EAFF]",
  outline:
    "bg-button-outline border-2 border-white/80  text-white hover:border-white/100 hover:bg-white/10",
  link: "text-white hover:underline",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  xl: "px-10 py-5 text-xl",
  xxl: "px-30 py-6 text-2xl",
};

export default function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 active:scale-95",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
