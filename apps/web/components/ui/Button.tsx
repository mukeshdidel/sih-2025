"use client"

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    variant: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
}

const Button = ({ children, onClick, variant, size }: ButtonProps) => {

    const variantMap = new Map<string, string>();
    variantMap.set("primary", "bg-blue-500 border border-gray-700 text-gray-700 hover:bg-blue-600 hover:text-gray-900");
    variantMap.set("secondary", "bg-slate-400 text-stone-700 border border-stone-700 hover:bg-blue-500 hover:text-gray-900");


    const sizeMap = new Map<string, string>();
    sizeMap.set("sm", "px-4 py-2 text-sm");
    sizeMap.set("md", "px-6 py-3 text-lg");
    sizeMap.set("lg", "px-8 py-4 text-xl");

    return (
      <button
        onClick={onClick}
        className={`rounded-lg font-medium transition-colors cursor-pointer ${variantMap.get(variant)} ${size ? sizeMap.get(size) : sizeMap.get("md")}`}
      >
      {children}
    </button>
  );
};

export default Button;

